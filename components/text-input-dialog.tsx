"use client"

import { useState } from "react"
import { FileText, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SAMPLE_TEXTS } from "@/lib/constants"

interface TextInputDialogProps {
  onTextSubmit: (text: string) => void
}

export function TextInputDialog({ onTextSubmit }: TextInputDialogProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"paste" | "file" | "sample">(
    "paste"
  )
  const [text, setText] = useState("")
  const [selectedSample, setSelectedSample] = useState<string>("")
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [fileError, setFileError] = useState("")

  const handleSubmit = () => {
    const finalText =
      activeTab === "sample" && selectedSample ? selectedSample : text
    if (finalText.trim()) {
      onTextSubmit(finalText.trim())
      setOpen(false)
      setText("")
      setSelectedSample("")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileError("")
      setSelectedFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result
        if (typeof content === "string") {
          setText(content)
        }
      }
      reader.onerror = () => {
        setFileError("Failed to read file. Please try again.")
      }
      reader.readAsText(file)
    }
  }

  const handleSampleSelect = (sampleText: string) => {
    setSelectedSample(sampleText)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="lg" className="size-14">
          <FileText className="size-6" />
          <span className="sr-only">Load Text</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Load Text to Read</DialogTitle>
          <DialogDescription>
            Choose how you want to input text for speed reading
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-2 border-b pb-2">
            <Button
              variant={activeTab === "paste" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("paste")}
              className="gap-2"
            >
              <Type className="h-4 w-4" />
              Paste
            </Button>
            <Button
              variant={activeTab === "file" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("file")}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              File
            </Button>
            <Button
              variant={activeTab === "sample" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("sample")}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Samples
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-4 min-h-100">
            {activeTab === "paste" && (
              <div className="space-y-3">
                <Label htmlFor="text-input">Paste your text here</Label>
                <Textarea
                  id="text-input"
                  placeholder="Paste the text you want to read..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {text.split(/\s+/).filter((w) => w.length > 0).length} words
                </p>
              </div>
            )}

            {activeTab === "file" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="file-upload">Upload a text file</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                      className="gap-2"
                      type="button"
                    >
                      <FileText className="h-4 w-4" />
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {selectedFileName || "No file chosen"}
                    </span>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {fileError && (
                    <p className="text-sm text-destructive">{fileError}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Supports .txt and .md files
                  </p>
                </div>
                {text && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      {text.split(/\s+/).filter((w) => w.length > 0).length}{" "}
                      words
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "sample" && (
              <div className="space-y-3">
                <Label>Choose a sample text</Label>
                <div className="space-y-2 max-h-100 overflow-y-auto">
                  {SAMPLE_TEXTS.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleSelect(sample.text)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        selectedSample === sample.text
                          ? "bg-secondary border-primary"
                          : "hover:bg-secondary/50"
                      }`}
                    >
                      <div className="font-semibold">{sample.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {sample.text}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {sample.text.split(/\s+/).length} words
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={activeTab === "sample" ? !selectedSample : !text.trim()}
            >
              Start Reading
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
