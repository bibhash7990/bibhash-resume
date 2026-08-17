'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { pdf } from '@react-pdf/renderer';
import { LuScanLine, LuChevronDown, LuLoader } from 'react-icons/lu';
import Resume from './Resume/pdf';
import extractPdfText from '@/utils/extractPdfText';
import scoreResume, { CATEGORY_LABELS, CATEGORY_MAX } from '@/utils/atsScore';

const FORMATS = [
    { id: 'format1', label: 'Format 1 (Classic)' },
    { id: 'format2', label: 'Format 2 (One-page)' },
    { id: 'format3', label: 'Format 3 (Merged)' },
    { id: 'format4', label: 'Format 4 (Full Stack)' },
];

const scoreColor = pct =>
    pct >= 0.9 ? 'text-emerald-400'
    : pct >= 0.75 ? 'text-yellow-400'
    : 'text-red-400';

const barColor = pct =>
    pct >= 0.9 ? 'bg-emerald-500'
    : pct >= 0.75 ? 'bg-yellow-500'
    : 'bg-red-500';

const SEVERITY_STYLES = {
    critical: 'border-red-700 bg-red-950/40 text-red-200',
    high: 'border-orange-700 bg-orange-950/40 text-orange-200',
    medium: 'border-yellow-700 bg-yellow-950/40 text-yellow-200',
    low: 'border-gray-600 bg-gray-800/60 text-gray-300',
};

const AtsChecker = () => {
    const profiles = useSelector(state => state.resume.profiles);
    const activeProfileId = useSelector(state => state.resume.activeProfileId);

    const [running, setRunning] = useState(false);
    const [progress, setProgress] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(null);

    const runCheck = async () => {
        setRunning(true);
        setError(null);
        setResults(null);
        setExpanded(null);

        try {
            const entries = Object.entries(profiles);
            const total = entries.length * FORMATS.length;
            const collected = [];
            let done = 0;

            for (const [profileId, profile] of entries) {
                for (const format of FORMATS) {
                    setProgress({
                        done,
                        total,
                        label: `${profile.meta?.name || 'Untitled'} — ${format.label}`,
                    });

                    const data = { ...profile, meta: { ...profile.meta, template: format.id } };
                    const blob = await pdf(<Resume data={data} />).toBlob();
                    const extracted = await extractPdfText(blob);
                    const result = scoreResume(extracted);

                    collected.push({
                        key: `${profileId}__${format.id}`,
                        profileId,
                        profileName: profile.meta?.name || 'Untitled',
                        formatId: format.id,
                        formatLabel: format.label,
                        isActive: profileId === activeProfileId,
                        ...result,
                    });

                    done += 1;
                }
            }

            setResults(collected);
        } catch (e) {
            setError(e?.message || 'Could not analyse the resumes.');
        } finally {
            setRunning(false);
            setProgress(null);
        }
    };

    const average =
        results?.length ?
            Math.round(results.reduce((a, r) => a + r.total, 0) / results.length)
        :   null;

    return (
        <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800/80 p-3 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        ATS Check
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Scores every resume in every format the way a parser reads it — from the PDF text layer.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={runCheck}
                    disabled={running}
                    className="btn flex items-center gap-2 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {running ?
                        <LuLoader className="animate-spin" />
                    :   <LuScanLine />}
                    <span>{running ? 'Checking…' : 'Check ATS Score'}</span>
                </button>
            </div>

            {progress && (
                <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-gray-400">
                        <span className="truncate">{progress.label}</span>
                        <span className="shrink-0 pl-2">
                            {progress.done}/{progress.total}
                        </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded bg-gray-700">
                        <div
                            className="h-full bg-primary-500 transition-all duration-300"
                            style={{ width: `${(progress.done / progress.total) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-3 rounded-md border border-red-700 bg-red-950/40 p-2.5 text-xs text-red-200">
                    {error}
                </div>
            )}

            {results && (
                <div className="mt-4">
                    <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-xs uppercase tracking-wider text-gray-400">
                            Results ({results.length})
                        </span>
                        <span className="text-xs text-gray-400">
                            Average{' '}
                            <span className={`font-semibold ${scoreColor(average / 100)}`}>{average}/100</span>
                        </span>
                    </div>

                    <div className="space-y-1.5">
                        {results.map(r => {
                            const pct = r.total / r.max;
                            const isOpen = expanded === r.key;

                            return (
                                <div
                                    key={r.key}
                                    className={`rounded-md border ${
                                        r.isActive ? 'border-primary-500/60 bg-primary-500/5' : 'border-gray-700 bg-gray-900/40'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(isOpen ? null : r.key)}
                                        className="flex w-full items-center gap-3 px-3 py-2 text-left"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="truncate text-sm text-gray-200">
                                                    {r.profileName}
                                                </span>
                                                {r.isActive && (
                                                    <span className="shrink-0 rounded bg-primary-500/20 px-1.5 py-0.5 text-[10px] font-medium text-primary-300">
                                                        active
                                                    </span>
                                                )}
                                            </div>
                                            <div className="truncate text-xs text-gray-500">
                                                {r.formatLabel} · {r.numPages} page{r.numPages > 1 ? 's' : ''} ·{' '}
                                                {r.words} words
                                                {r.findings.length > 0 &&
                                                    ` · ${r.findings.length} issue${r.findings.length > 1 ? 's' : ''}`}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2">
                                            <div className="hidden h-1.5 w-16 overflow-hidden rounded bg-gray-700 sm:block">
                                                <div
                                                    className={`h-full ${barColor(pct)}`}
                                                    style={{ width: `${pct * 100}%` }}
                                                />
                                            </div>
                                            <span className={`text-sm font-semibold ${scoreColor(pct)}`}>
                                                {r.total}
                                                <span className="text-xs text-gray-500">/{r.max}</span>
                                            </span>
                                            <LuChevronDown
                                                className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                size={14}
                                            />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-gray-700 px-3 py-2.5">
                                            <div className="space-y-1">
                                                {Object.entries(r.scores).map(([cat, value]) => (
                                                    <div key={cat} className="flex items-center gap-2 text-xs">
                                                        <span className="w-36 shrink-0 text-gray-400">
                                                            {CATEGORY_LABELS[cat]}
                                                        </span>
                                                        <div className="h-1 flex-1 overflow-hidden rounded bg-gray-700">
                                                            <div
                                                                className={`h-full ${barColor(value / CATEGORY_MAX[cat])}`}
                                                                style={{ width: `${(value / CATEGORY_MAX[cat]) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="w-10 shrink-0 text-right text-gray-400">
                                                            {value}/{CATEGORY_MAX[cat]}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {r.findings.length > 0 ?
                                                <div className="mt-3 space-y-1.5">
                                                    {r.findings.map((f, i) => (
                                                        <div
                                                            key={i}
                                                            className={`rounded border p-2 text-xs ${SEVERITY_STYLES[f.severity] || SEVERITY_STYLES.low}`}
                                                        >
                                                            <span className="font-semibold uppercase">
                                                                {f.severity}
                                                            </span>{' '}
                                                            <span className="opacity-70">({f.category})</span>{' '}
                                                            {f.message}
                                                        </div>
                                                    ))}
                                                </div>
                                            :   <div className="mt-3 rounded border border-emerald-800 bg-emerald-950/30 p-2 text-xs text-emerald-300">
                                                    No issues found — parses cleanly.
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-3 text-[11px] leading-relaxed text-gray-500">
                        Heuristic check of PDF parseability, contact fields, section headings, date formats and
                        keyword coverage. Real systems (Workday, Greenhouse, Taleo) each parse a little
                        differently, so treat this as a strong pre-flight, not a guarantee.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AtsChecker;
