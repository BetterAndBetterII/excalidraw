import React from "react";

import clsx from "clsx";

import { FilledButton } from "@excalidraw/excalidraw/components/FilledButton";

import {
  FreedrawIcon,
  LoadIcon,
  TrashIcon,
} from "@excalidraw/excalidraw/components/icons";

import { timeAgo } from "../utils/time";

import { useAtom, useSetAtom } from "../app-jotai";
import {
  userAtom,
  createCanvasDialogAtom,
  renameCanvasDialogAtom,
} from "../app-jotai";

import "./MyCreationsTab.scss";

import type { CanvasMetadata } from "../data/storage";

interface MyCreationsTabProps {
  canvases: readonly CanvasMetadata[];
  onCanvasSelect: (id: string) => void;
  onCanvasDelete: (id: string) => void;
  currentCanvasId: string | null;
}

export const MyCreationsTab: React.FC<MyCreationsTabProps> = ({
  canvases,
  onCanvasSelect,
  onCanvasDelete,
  currentCanvasId,
}) => {
  const [user] = useAtom(userAtom);
  const setCreateCanvasDialog = useSetAtom(createCanvasDialogAtom);
  const setRenameCanvasDialog = useSetAtom(renameCanvasDialogAtom);

  const sortedCanvases = [...canvases].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <div className="my-creations-tab">
      <div style={{ marginBottom: "1rem" }}>
        <FilledButton
          label="Create New Canvas"
          onClick={() => setCreateCanvasDialog({ isOpen: true })}
          fullWidth
        >
          Create New Canvas
        </FilledButton>
      </div>
      <div className="my-creations-tab__grid">
        {canvases.length === 0 ? (
          <div className="my-creations-tab__empty">
            {LoadIcon}
            <p>You have no saved canvases yet.</p>
            <p>
              Create a new canvas to get started. It will be saved{" "}
              {user ? "to your account" : "in your browser"}.
            </p>
          </div>
        ) : (
          sortedCanvases.map((canvas) => (
            <div
              key={canvas.id}
              className={clsx("my-creations-tab__card", {
                "my-creations-tab__card--active": canvas.id === currentCanvasId,
              })}
              onClick={() => onCanvasSelect(canvas.id)}
            >
              {canvas.thumbnail ? (
                <img
                  src={canvas.thumbnail}
                  alt={canvas.name}
                  className="my-creations-tab__card-thumbnail"
                />
              ) : (
                <div className="my-creations-tab__card-thumbnail--placeholder">
                  No preview
                </div>
              )}
              <div className="my-creations-tab__card-info">
                <div className="my-creations-tab__card-details">
                  <span className="my-creations-tab__card-name">
                    {canvas.name}
                  </span>
                  <span className="my-creations-tab__card-date">
                    {timeAgo(canvas.updatedAt)}
                  </span>
                </div>
                <div className="my-creations-tab__card-actions">
                  <button
                    className="my-creations-tab__card-rename"
                    title="Rename canvas"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenameCanvasDialog({
                        isOpen: true,
                        canvasId: canvas.id,
                        currentName: canvas.name,
                      });
                    }}
                  >
                    {FreedrawIcon}
                  </button>
                  <button
                    className="my-creations-tab__card-delete"
                    title="Delete canvas"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCanvasDelete(canvas.id);
                    }}
                  >
                    {TrashIcon}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
