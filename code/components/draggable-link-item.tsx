"use client"

import type React from "react"

import { useState } from "react"
import type { PersonalLink } from "@/types"
import { ICON_MAP } from "./link-icons"
import { Trash2, Grip, Eye, EyeOff } from "lucide-react"

interface DraggableLinkItemProps {
  link: PersonalLink
  index: number
  total: number
  isDragging?: boolean
  onEdit: (link: PersonalLink) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
}

export function DraggableLinkItem({
  link,
  index,
  total,
  isDragging = false,
  onEdit,
  onDelete,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: DraggableLinkItemProps) {
  const [isDragHover, setIsDragHover] = useState(false)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragHover(true)
        onDragOver?.(e)
      }}
      onDragLeave={() => setIsDragHover(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragHover(false)
        onDrop?.(e)
      }}
      onDragEnd={(e) => {
        setIsDragHover(false)
        onDragEnd?.(e)
      }}
      className={`group flex items-center justify-between p-4 bg-input border-2 rounded-lg transition-all ${
        isDragging ? "opacity-50 border-primary/50" : "border-border"
      } ${isDragHover ? "bg-input border-primary" : ""}`}
      role="listitem"
      aria-label={`Link: ${link.title}`}
    >
      {/* Drag Handle */}
      <div className="flex items-center gap-3 flex-1 cursor-grab active:cursor-grabbing">
        <div className="text-muted-foreground group-hover:text-primary transition-colors" title="Drag to reorder">
          <Grip className="w-5 h-5" />
        </div>

        <div className="text-primary">{ICON_MAP[link.icon] || ICON_MAP.globe}</div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{link.title}</p>
          <p className="text-xs text-muted-foreground truncate">{link.url}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        {/* Visibility Toggle */}
        <button
          onClick={() => onToggleVisibility(link.id)}
          className="p-2 hover:bg-muted rounded transition-colors"
          title={link.visible ? "Hide" : "Show"}
          aria-label={link.visible ? `Hide ${link.title}` : `Show ${link.title}`}
        >
          {link.visible ? (
            <Eye className="w-4 h-4 text-primary" />
          ) : (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Move Up Button */}
        {index > 0 && (
          <button
            onClick={onMoveUp}
            className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors"
            title="Move up"
            aria-label={`Move ${link.title} up`}
          >
            ↑
          </button>
        )}

        {/* Move Down Button */}
        {index < total - 1 && (
          <button
            onClick={onMoveDown}
            className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors"
            title="Move down"
            aria-label={`Move ${link.title} down`}
          >
            ↓
          </button>
        )}

        {/* Edit Button */}
        <button
          onClick={() => onEdit(link)}
          className="px-3 py-1 text-xs bg-primary/20 text-primary hover:bg-primary/30 rounded transition-colors"
          aria-label={`Edit ${link.title}`}
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => {
            if (window.confirm(`Delete "${link.title}"?`)) {
              onDelete(link.id)
            }
          }}
          className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
          aria-label={`Delete ${link.title}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
