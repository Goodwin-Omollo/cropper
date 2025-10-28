"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Loader2, UploadIcon, XIcon } from "lucide-react";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from "@/components/ui/shadcn-io/image-crop";
import { div } from "framer-motion/client";
import { RxReset } from "react-icons/rx";

export default function TestImageCropPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setCroppedImage(null);
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    setIsUploading(true);

    // Simulate upload delay
    await new Promise((r) => setTimeout(r, 1500));

    alert("✅ Image cropped successfully!");
    setIsUploading(false);
    resetAll();
  };

  // Step 1 — No image selected
  if (!selectedFile) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        {" "}
        <div className="space-y-4 ">
          <Label className="text-center text-sm font-medium text-foreground">
            Upload and Crop Image
          </Label>

          <div className="flex flex-col items-center justify-center h-48 w-48 mx-auto bg-linear-to-br from-muted/30 to-muted/10 rounded-xl border-2 border-dashed border-muted-foreground/25 text-muted-foreground">
            <div className="p-4 rounded-full bg-muted-foreground/5 mb-4">
              <ImageIcon className="h-8 w-8" />
            </div>
            <span className="text-sm font-medium mb-4">No image selected</span>

            <Input
              accept="image/*"
              className="hidden"
              id="image-upload"
              type="file"
              onChange={handleFileChange}
            />
            <Button asChild>
              <label htmlFor="image-upload" className="cursor-pointer">
                Choose Image
              </label>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2 — Cropping stage
  if (!croppedImage) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="space-y-4">
          {" "}
          <Label className="text-sm font-medium text-foreground">
            Crop Your Image
          </Label>
          <ImageCrop
            aspect={1} // square crop
            file={selectedFile}
            maxImageSize={1024 * 1024}
            onCrop={setCroppedImage}
          >
            <ImageCropContent className="max-w-md" />
            <div className="flex items-center gap-2 mt-2">
              <ImageCropApply asChild>
                <Button size="sm" variant="outline">
                  Apply Crop
                </Button>
              </ImageCropApply>

              <ImageCropReset asChild>
                <Button size="sm" variant="outline">
                  Reset
                </Button>
              </ImageCropReset>

              <Button onClick={resetAll} size="sm" variant="outline">
                Start Over
              </Button>
            </div>
          </ImageCrop>
        </div>
      </div>
    );
  }

  // Step 3 — Preview & Upload Simulation
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground">
          Cropped Image Preview
        </Label>
        <div className="grid items-center gap-4">
          <div className="relative h-32 w-32 flex-shrink-0">
            <Image
              alt="Cropped image preview"
              src={croppedImage}
              fill
              className="rounded-md border object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              disabled={isUploading}
              onClick={handleUpload}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>

            <Button onClick={resetAll} size="sm" variant="destructive">
              <RxReset className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
