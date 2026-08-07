"use client";

import React, { DragEvent, useState } from "react";
import { Download, Eye, UploadCloud, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import uploadIcon from "../../../assets/icons/Upload icon.svg";
import { Button } from "../../ui/button";

import "./file-uploader.scss";

import Image from "next/image";

interface UploadedFile {
  id?: any;
  name?: string;
  file?: File;
  url?: string;
  onStateChange?: (file: any) => void;
  singleFile?: boolean;
  onFileChange?: (file: File | null) => void;
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  className?: string;
  initialFiles?: Array<{ id?: string; name: string; download_url?: string }>;
}

export default function FileUploader(props: UploadedFile) {
  const [files, setFiles] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const fileList = Array.from(selectedFiles);
    const firstFile = fileList[0];
    if (!firstFile) return;

    if (props.singleFile) {
      const newFiles = [
        {
          id: uuidv4(),
          name: firstFile.name,
          file: firstFile,
          url: URL.createObjectURL(firstFile),
        },
      ];
      setFiles(newFiles);
      props.onFileChange?.(firstFile);
    } else {
      const newFiles = fileList.map((file) => ({
        id: uuidv4(),
        name: file.name,
        file,
        url: URL.createObjectURL(file),
      }));
      setFiles((prev) => {
        const updated = [...prev, ...newFiles];
        props.onFilesChange?.(updated.map((f) => f.file).filter(Boolean) as File[]);
        return updated;
      });
      if (props.onStateChange) props.onStateChange(firstFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (!props.singleFile && props.onFilesChange) {
        props.onFilesChange(next.map((f) => f.file).filter(Boolean) as File[]);
      }
      return next;
    });
    if (props.singleFile && props.onFileChange) {
      props.onFileChange(null);
    }
  };

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement("a");
    link.href = file.url ?? "";
    link.download = file.name ?? "";
    link.click();
  };
  return (
    <div className={`file-uploader `}>
      <LabelBar title={props.id || ""} />
      <div
        className={`upload-area ${props.className || ""} ${isDragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="upload-placeholder">
          <Image
            src={uploadIcon}
            alt="Upload Icon"
            className="upload-icon"
            width={40}
            height={40}
          />
          <p>
            Drag & drop files or{" "}
            <label className="browse">
              Browse
              <input
                type="file"
                multiple={!props.singleFile}
                accept={props.accept ?? ".xlsx, .csv"}
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          </p>
          <span>Supported formats: xlsx, csv</span>
        </div>
      </div>

      <div className="file-list">
        {files.map((f) => (
          <div key={f.id} className="file-item">
            <span className="file-name">{f.name}</span>

            <div className="file-actions gap-0">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDownload(f)}
                className="icon-button me-5"
                style={{ color: "#1BA967" }}
              >
                Download
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => window.open(f.url ?? "", "_blank")}
                className="icon-button gap-0"
                style={{ color: "#595959" }}
              >
                <Eye size={16} />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(f.id);
                }}
                className="icon-button gap-0"
                style={{ color: "#EA2340" }}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// small helper for section title
const LabelBar = ({ title }: { title: string }) => <div className="file-label">{title}</div>;
