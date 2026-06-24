import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';

/** Bump when the state shape changes so clients reload fresh instead of loading stale localStorage. */
export const RESUME_STORAGE_VERSION = 11;

const loadState = () => {
    console.info('Loading State from Local Storage...');

    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) return undefined;

        const parsed = JSON.parse(serializedState);

        if (
            parsed &&
            typeof parsed === 'object' &&
            parsed.v === RESUME_STORAGE_VERSION &&
            parsed.resume != null &&
            typeof parsed.resume === 'object'
        ) {
            console.info('State Loaded Successfully from Local Storage');
            return { resume: parsed.resume };
        }

        console.info('Ignoring stale or invalid resume storage (version mismatch or legacy shape)');
        return undefined;
    } catch (err) {
        console.warn('Error Loading State from Local Storage');
        return undefined;
    }
};

const store = configureStore({
    devTools: true,
    preloadedState: loadState(),
    reducer: {
        resume: resumeReducer,
    },
});

function debounce(func, timeout = 2500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const saveState = debounce(() => {
    console.info('Saving State to Local Storage...');
    const payload = {
        v: RESUME_STORAGE_VERSION,
        resume: store.getState().resume,
    };
    localStorage.setItem('reduxState', JSON.stringify(payload));
});

store.subscribe(saveState);

export default store;
