"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Search,
  Upload,
  Download,
  RotateCcw,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock song data for search suggestions
const mockSongs = [
  "Shape of You - Ed Sheeran",
  "Blinding Lights - The Weeknd",
  "Watermelon Sugar - Harry Styles",
  "Levitating - Dua Lipa",
  "Good 4 U - Olivia Rodrigo",
  "Stay - The Kid LAROI & Justin Bieber",
  "Industry Baby - Lil Nas X",
  "Heat Waves - Glass Animals",
  "As It Was - Harry Styles",
  "About Damn Time - Lizzo",
];

export default function MusicGenerator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSong, setGeneratedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter songs based on search query
  const filteredSongs = mockSongs.filter((song) =>
    song.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
  };

  const handleSongSelect = (song: string) => {
    setSelectedSong(song);
    setSearchQuery(song);
    setShowDropdown(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedSong && !uploadedFile) {
      alert("Please provide a youtube URL or upload an MP3 file");
      return;
    }
    if (!selectedLanguage) {
      alert("Please select a language");
      return;
    }

    setIsGenerating(true);

    // Simulate generation process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock generated song URL (using a placeholder audio)
    setGeneratedSong("/placeholder-audio.mp3");
    setIsGenerating(false);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleDownload = () => {
    if (generatedSong) {
      const link = document.createElement("a");
      link.href = generatedSong;
      link.download = "generated-song.mp3";
      link.click();
    }
  };

  const handleRegenerate = () => {
    setGeneratedSong(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry Night Background */}
      <div className="fixed inset-0 z-0">
        {/* Night sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-blue-900 to-slate-900"></div>

        {/* Stars */}
        <div className="absolute inset-0">
          {/* Large stars */}
          <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-white rounded-full animate-pulse opacity-90"></div>
          <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-80 animation-delay-1000"></div>
          <div className="absolute top-[35%] left-[25%] w-2 h-2 bg-white rounded-full animate-pulse opacity-95 animation-delay-2000"></div>
          <div className="absolute top-[15%] left-[60%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-85 animation-delay-3000"></div>
          <div className="absolute top-[45%] right-[15%] w-2 h-2 bg-white rounded-full animate-pulse opacity-90 animation-delay-4000"></div>
          <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-80 animation-delay-5000"></div>
          <div className="absolute top-[70%] right-[35%] w-2 h-2 bg-white rounded-full animate-pulse opacity-95 animation-delay-6000"></div>
          <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-85"></div>
          <div className="absolute top-[55%] left-[70%] w-2 h-2 bg-white rounded-full animate-pulse opacity-90 animation-delay-1500"></div>
          <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-80 animation-delay-2500"></div>

          {/* Medium stars */}
          <div className="absolute top-[12%] left-[45%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70 animation-delay-500"></div>
          <div className="absolute top-[28%] right-[40%] w-1 h-1 bg-white rounded-full animate-pulse opacity-75 animation-delay-1500"></div>
          <div className="absolute top-[42%] left-[55%] w-1 h-1 bg-white rounded-full animate-pulse opacity-65 animation-delay-2500"></div>
          <div className="absolute top-[18%] right-[60%] w-1 h-1 bg-white rounded-full animate-pulse opacity-80 animation-delay-3500"></div>
          <div className="absolute top-[65%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70 animation-delay-4500"></div>
          <div className="absolute top-[75%] right-[25%] w-1 h-1 bg-white rounded-full animate-pulse opacity-75 animation-delay-5500"></div>
          <div className="absolute top-[32%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulse opacity-65 animation-delay-6500"></div>
          <div className="absolute top-[48%] right-[70%] w-1 h-1 bg-white rounded-full animate-pulse opacity-80 animation-delay-500"></div>
          <div className="absolute top-[85%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70 animation-delay-1000"></div>
          <div className="absolute top-[38%] right-[10%] w-1 h-1 bg-white rounded-full animate-pulse opacity-75 animation-delay-2000"></div>

          {/* Small stars */}
          <div className="absolute top-[8%] left-[35%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60 animation-delay-750"></div>
          <div className="absolute top-[22%] right-[50%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-55 animation-delay-1750"></div>
          <div className="absolute top-[38%] left-[75%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65 animation-delay-2750"></div>
          <div className="absolute top-[52%] right-[45%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50 animation-delay-3750"></div>
          <div className="absolute top-[68%] left-[65%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60 animation-delay-4750"></div>
          <div className="absolute top-[78%] right-[55%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-55 animation-delay-5750"></div>
          <div className="absolute top-[14%] left-[90%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65 animation-delay-6750"></div>
          <div className="absolute top-[44%] right-[80%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50 animation-delay-750"></div>
          <div className="absolute top-[58%] left-[50%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60 animation-delay-1250"></div>
          <div className="absolute top-[88%] right-[30%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-55 animation-delay-2250"></div>
          <div className="absolute top-[5%] left-[70%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65 animation-delay-3250"></div>
          <div className="absolute top-[30%] right-[85%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50 animation-delay-4250"></div>
          <div className="absolute top-[50%] left-[15%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60 animation-delay-5250"></div>
          <div className="absolute top-[72%] right-[65%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-55 animation-delay-6250"></div>
          <div className="absolute top-[90%] left-[80%] w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-65 animation-delay-1500"></div>
        </div>

        {/* Shooting stars */}
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-white rounded-full opacity-90 animate-shooting-star"></div>
        <div className="absolute top-[60%] right-[20%] w-1 h-1 bg-white rounded-full opacity-80 animate-shooting-star animation-delay-8000"></div>

        {/* More shooting stars with different directions and speeds */}
        <div className="absolute top-[10%] right-[5%] w-1 h-1 bg-white rounded-full opacity-85 animate-shooting-star-slow"></div>
        <div className="absolute top-[40%] left-[5%] w-1.5 h-1.5 bg-white rounded-full opacity-90 animate-shooting-star-fast animation-delay-3000"></div>
        <div className="absolute top-[70%] right-[30%] w-1 h-1 bg-white rounded-full opacity-80 animate-shooting-star animation-delay-5000"></div>
        <div className="absolute top-[25%] left-[70%] w-1.5 h-1.5 bg-white rounded-full opacity-95 animate-shooting-star-diagonal animation-delay-7000"></div>
        <div className="absolute top-[55%] right-[60%] w-1 h-1 bg-white rounded-full opacity-85 animate-shooting-star-reverse animation-delay-9000"></div>
        <div className="absolute top-[15%] left-[40%] w-1.5 h-1.5 bg-white rounded-full opacity-90 animate-shooting-star-slow animation-delay-11000"></div>
        <div className="absolute top-[80%] left-[60%] w-1 h-1 bg-white rounded-full opacity-80 animate-shooting-star-fast animation-delay-13000"></div>
        <div className="absolute top-[35%] right-[40%] w-1.5 h-1.5 bg-white rounded-full opacity-95 animate-shooting-star-diagonal animation-delay-15000"></div>

        {/* Floating stars that move in circular patterns */}
        <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-white rounded-full opacity-75 animate-float-circular"></div>
        <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-float-circular animation-delay-4000"></div>
        <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-white rounded-full opacity-70 animate-float-circular animation-delay-8000"></div>
        <div className="absolute top-[75%] left-[25%] w-1.5 h-1.5 bg-white rounded-full opacity-85 animate-float-circular animation-delay-12000"></div>

        {/* Drifting stars that move slowly across the screen */}
        <div className="absolute top-[30%] left-[10%] w-1 h-1 bg-white rounded-full opacity-65 animate-drift-horizontal"></div>
        <div className="absolute top-[50%] right-[10%] w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-drift-vertical animation-delay-6000"></div>
        <div className="absolute top-[65%] left-[50%] w-1 h-1 bg-white rounded-full opacity-75 animate-drift-diagonal animation-delay-10000"></div>
        <div className="absolute top-[85%] right-[70%] w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-drift-horizontal animation-delay-14000"></div>

        {/* Nebula effect */}
        <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[15%] w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 rounded-full filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center py-8">
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-2xl animate-pulse-text">
              Xing Xing
            </h1>
            <br />
            <div className="text-2xl font-semibold text-white/90 mb-1">
              AI Music Generator
            </div>

            <p className="text-white/90 drop-shadow-lg text-lg">
              Transform your favorite songs into different languages
            </p>
          </div>

          <Card className="backdrop-blur-lg bg-white/25 border-white/20 shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-xl">
                Song Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="relative">
                  <Input
                    placeholder="Paste a YouTube URL..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="bg-white/30 backdrop-blur-md border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed border-white/40 rounded-lg p-6 text-center bg-white/25 backdrop-blur-md transition-all duration-300">
                <Upload className="mx-auto h-12 w-12 text-white/80 mb-4" />
                <p className="text-white/90 mb-2">
                  Or upload your own MP3 file
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-white/40 text-white bg-white/20 backdrop-blur-md"
                >
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mp3,audio/mpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {uploadedFile && (
                  <p className="mt-2 text-sm text-green-300 font-medium drop-shadow">
                    Uploaded: {uploadedFile.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/25 border-white/20 shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-xl">
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Select Target Language
                </label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="bg-white/30 backdrop-blur-md border-white/30 text-white">
                    <SelectValue
                      placeholder="Choose a language"
                      className="text-white/60"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 z-50">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                    <SelectItem value="malay">Malay</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isGenerating && (
            <Card className="backdrop-blur-lg bg-white/25 border-white/20 shadow-2xl">
              <CardContent className="py-8">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                  <p className="text-lg font-medium text-white">
                    Generating your song...
                  </p>
                  <p className="text-white/80">This may take a few moments</p>
                  <Progress
                    value={66}
                    className="w-full max-w-md mx-auto bg-white/30"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Music Player */}
          {generatedSong && !isGenerating && (
            <Card className="backdrop-blur-lg bg-white/25 border-white/20 shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  Generated Song
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/25 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePlayPause}
                        className="h-12 w-12 border-white/40 text-white bg-white/20 backdrop-blur-md"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                      <div>
                        <p className="font-medium text-white">Generated Song</p>
                        <p className="text-sm text-white/80">
                          Language:{" "}
                          {selectedLanguage.charAt(0).toUpperCase() +
                            selectedLanguage.slice(1)}
                        </p>
                      </div>
                    </div>
                    <Volume2 className="h-5 w-5 text-white/70" />
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            duration ? (currentTime / duration) * 100 : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/80">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <audio
                    ref={audioRef}
                    src={generatedSong}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 transform hover:scale-105 transition-all duration-300"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Song
                  </Button>
                  <Button
                    onClick={handleRegenerate}
                    variant="outline"
                    className="flex-1 border-white/40 text-white bg-white/20 backdrop-blur-md transform hover:scale-105 transition-all duration-300"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
