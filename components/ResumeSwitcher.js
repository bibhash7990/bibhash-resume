'use client';

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    switchProfile,
    createProfile,
    duplicateProfile,
    renameProfile,
    deleteProfile,
    importProfile,
    selectActiveResume,
} from '@/store/slices/resumeSlice';
import { LuPlus, LuCopy, LuPencil, LuTrash2, LuChevronDown, LuDownload, LuUpload } from 'react-icons/lu';

const ResumeSwitcher = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.resume.profiles);
    const activeId = useSelector(state => state.resume.activeProfileId);
    const activeResume = useSelector(selectActiveResume);
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [renaming, setRenaming] = useState(null); // profile id being renamed
    const [renameValue, setRenameValue] = useState('');
    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
                setRenaming(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const profileIds = Object.keys(profiles);
    // During SSR / hydration the server state may differ from client localStorage;
    // wait for mount to avoid hydration mismatch.
    const activeName = mounted ? (activeResume?.meta?.name || 'Untitled Resume') : 'Resume';

    const handleSelect = id => {
        dispatch(switchProfile(id));
        setOpen(false);
        setRenaming(null);
    };

    const handleCreate = () => {
        dispatch(createProfile());
        setOpen(false);
    };

    const handleDuplicate = (id) => {
        dispatch(duplicateProfile(id));
        setOpen(false);
    };

    const handleDelete = id => {
        if (profileIds.length <= 1) return;
        if (!confirm(`Delete "${profiles[id]?.meta?.name || 'Untitled'}"? This cannot be undone.`)) return;
        dispatch(deleteProfile(id));
        setRenaming(null);
    };

    const commitRename = id => {
        const trimmed = renameValue.trim();
        if (trimmed) {
            dispatch(renameProfile({ id, name: trimmed }));
        }
        setRenaming(null);
    };

    // Export the active profile as a downloadable JSON file
    const handleExport = id => {
        const profile = profiles[id];
        if (!profile) return;
        const name = profile.meta?.name || 'resume';
        const exportData = {
            exportedAt: new Date().toISOString(),
            name,
            data: JSON.parse(JSON.stringify(profile)),
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setOpen(false);
    };

    // Trigger the hidden file input for import
    const handleImportClick = () => {
        fileInputRef.current?.click();
        setOpen(false);
    };

    // Parse the uploaded JSON and dispatch importProfile
    const handleImportFile = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const imported = JSON.parse(event.target.result);
                // Support both { name, data } format and raw profile format
                const rawData = imported.data || imported;
                const importName = imported.name || rawData?.meta?.name || file.name.replace(/\.json$/i, '');
                dispatch(importProfile({ name: importName, data: rawData }));
            } catch (err) {
                alert('Invalid resume file. Please upload a valid JSON file exported from this tool.');
            }
        };
        reader.readAsText(file);
        // Reset so the same file can be re-imported
        e.target.value = '';
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="btn flex w-full items-center justify-between gap-2 px-4 py-2 text-sm md:w-auto md:text-base"
            >
                <span className="truncate">{activeName}</span>
                <LuChevronDown className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-lg border border-gray-600 bg-gray-800 p-2 shadow-xl">
                    {/* Profile list */}
                    <div className="mb-2 max-h-60 space-y-1 overflow-y-auto">
                        {profileIds.map(id => {
                            const p = profiles[id];
                            const isActive = id === activeId;
                            return (
                                <div
                                    key={id}
                                    onClick={() => {
                                        if (renaming !== id) handleSelect(id);
                                    }}
                                    className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                                        isActive ? 'bg-primary-400/20 text-primary-300' : 'hover:bg-gray-700'
                                    }`}
                                >
                                    {renaming === id ?
                                        <input
                                            autoFocus
                                            className="min-w-0 flex-1 rounded bg-gray-700 px-2 py-0.5 text-sm text-white outline-none ring-1 ring-primary-400"
                                            value={renameValue}
                                            onChange={e => setRenameValue(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.stopPropagation();
                                                    commitRename(id);
                                                }
                                                if (e.key === 'Escape') {
                                                    setRenaming(null);
                                                }
                                            }}
                                            onBlur={() => commitRename(id)}
                                            onClick={e => e.stopPropagation()}
                                        />
                                    :   <span className="min-w-0 flex-1 truncate">{p?.meta?.name || 'Untitled'}</span>
                                    }

                                    {renaming !== id && (
                                        <div className="flex shrink-0 items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setRenaming(id);
                                                    setRenameValue(p?.meta?.name || '');
                                                }}
                                                className="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
                                                title="Rename"
                                            >
                                                <LuPencil size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleDuplicate(id);
                                                }}
                                                className="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
                                                title="Duplicate"
                                            >
                                                <LuCopy size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleDelete(id);
                                                }}
                                                className="rounded p-1 text-red-400 hover:bg-red-600/30 hover:text-red-300 disabled:opacity-30"
                                                title="Delete"
                                                disabled={profileIds.length <= 1}
                                            >
                                                <LuTrash2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="border-t border-gray-600 pt-2 space-y-1">
                        <button
                            type="button"
                            onClick={handleCreate}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                        >
                            <LuPlus size={16} />
                            <span>Create New Resume</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { handleExport(activeId); }}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                        >
                            <LuDownload size={16} />
                            <span>Export Active Resume</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleImportClick}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                        >
                            <LuUpload size={16} />
                            <span>Import Resume</span>
                        </button>
                    </div>

                    {/* Hidden file input for import */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImportFile}
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
};

export default ResumeSwitcher;
