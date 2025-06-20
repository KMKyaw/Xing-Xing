from transformers import GPT2Tokenizer
import torch
import os
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import XttsAudioConfig, XttsArgs
from TTS.config.shared_configs import BaseDatasetConfig
from TTS.api import TTS
from pydub import AudioSegment

# Add globals for safe deserialization
torch.serialization.add_safe_globals([
    XttsConfig,
    XttsAudioConfig,
    BaseDatasetConfig,
    XttsArgs
])

# Load model and tokenizer
tts = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")  # Closest to XTTS tokenizer

speaker_wav = "./vocals.wav"

# Token-based splitter
def split_text_by_tokens(text, max_tokens=380):
    tokens = tokenizer.tokenize(text)
    chunks = []
    current_chunk = []
    current_len = 0

    for token in tokens:
        current_len += 1
        current_chunk.append(token)
        if current_len >= max_tokens:
            chunk_text = tokenizer.convert_tokens_to_string(current_chunk)
            chunks.append(chunk_text.strip())
            current_chunk = []
            current_len = 0

    if current_chunk:
        chunk_text = tokenizer.convert_tokens_to_string(current_chunk)
        chunks.append(chunk_text.strip())

    return chunks

# Slowdown function using frame rate
def slow_down_audio(audio, speed=0.9):
    new_frame_rate = int(audio.frame_rate * speed)
    slowed = audio._spawn(audio.raw_data, overrides={"frame_rate": new_frame_rate})
    return slowed.set_frame_rate(audio.frame_rate)

# Audio concatenation with slowdown
def concatenate_audios(audio_paths, output_path, speed=0.9):
    combined = AudioSegment.empty()
    for path in audio_paths:
        audio = AudioSegment.from_wav(path)
        audio = slow_down_audio(audio, speed=speed)
        combined += audio
    combined.export(output_path, format="wav")

# Sample text
samples = [
    ("zh", "就我开始换了是不是我有做错了什么你哭着对我说通话里都是骗人的我不可能是你的王子也许你不会懂从你说爱我以后我的天空心心都亮了我远变成通话里你爱的那个天使张开双手变成翅膀守护你你要相信相信我们会想通话故事里幸福和怀了世界局你哭着对我说通话里都是骗人的我不可能是你的王子也许你不会懂从你说爱我以后我的天空心心都亮了我远变成通话里你爱的那个天使张开双手变成翅膀守护你你要相信相信我们会想通话故事里幸福和怀了世界局我要变成通话里你爱的那个天使张开双手变成翅膀守护你你要相信相信我们会想通话故事里幸福和怀了世界局我会变成通话里你爱的那个天使张开双手变成翅膀守护你你要相信相信我们会想通话故事里幸福和怀了世界局一起写我们的结局")
]

for lang, text in samples:
    chunks = split_text_by_tokens(text)
    chunk_paths = []

    for i, chunk in enumerate(chunks):
        chunk_path = f"chunk_{lang}_{i}.wav"
        tts.tts_to_file(
            text=chunk,
            file_path=chunk_path,
            language=lang,
            speaker_wav=speaker_wav,
        )
        chunk_paths.append(chunk_path)

    output_path = f"output_{lang}.wav"
    concatenate_audios(chunk_paths, output_path, speed=0.9)  # Slows down to 90% speed

    # Clean up chunk files
    for path in chunk_paths:
        os.remove(path)

print("✅ XTTS synthesis completed with slowed-down audio.")
