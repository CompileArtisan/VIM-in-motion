module.exports = [
"[project]/lib/levels.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LEVELS",
    ()=>LEVELS
]);
const LEVELS = [
    {
        id: "stage-1",
        title: "Enter the Editor",
        description: "VIM starts in Normal mode. To type text, you need to enter Insert mode. Press <kbd>i</kbd> to insert before the cursor, or <kbd>a</kbd> to append after. Press <kbd>Esc</kbd> to return to Normal mode.",
        cheatsheet: [
            {
                key: "i",
                desc: "enter insert mode (before cursor)"
            },
            {
                key: "a",
                desc: "enter insert mode (after cursor)"
            },
            {
                key: "Esc",
                desc: "return to normal mode"
            }
        ],
        startText: "Hello, _____!",
        task: `Replace <span class="target">_____</span> with <span class="target">World</span> so the text reads: <strong>Hello, World!</strong>`,
        check: (text)=>text.trim() === "Hello, World!"
    },
    {
        id: "stage-2",
        title: "Moving Around",
        description: "In Normal mode, use <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd> to move left/down/up/right. Use <kbd>w</kbd> to jump forward a word, <kbd>b</kbd> to jump back. Try to navigate without arrow keys!",
        cheatsheet: [
            {
                key: "h / l",
                desc: "left / right"
            },
            {
                key: "j / k",
                desc: "down / up"
            },
            {
                key: "w",
                desc: "next word"
            },
            {
                key: "b",
                desc: "previous word"
            }
        ],
        startText: `The quick brown fox\njumps over the lazy dog\nVIM is fast and efficient`,
        task: `The third line says <span class="target">efficient</span>. Change it to <span class="target">powerful</span>. Navigate there using VIM keys (no arrow keys!), then edit.`,
        check: (text)=>text.includes("powerful") && !text.includes("efficient")
    },
    {
        id: "stage-3",
        title: "Delete Like a Pro",
        description: "VIM's delete command is <kbd>d</kbd> followed by a motion. <kbd>dw</kbd> deletes a word, <kbd>d$</kbd> deletes to end of line, <kbd>dd</kbd> deletes the whole line. You can add a count: <kbd>d3w</kbd> deletes 3 words.",
        cheatsheet: [
            {
                key: "dw",
                desc: "delete word forward"
            },
            {
                key: "dd",
                desc: "delete entire line"
            },
            {
                key: "d$",
                desc: "delete to end of line"
            },
            {
                key: "d3w",
                desc: "delete 3 words"
            }
        ],
        startText: `Keep this line safe\nDELETE DELETE DELETE this entire line\nThis line should stay too`,
        task: `Delete the <span class="target">entire middle line</span> (the one with DELETE). The other two lines should remain untouched.`,
        check: (text)=>{
            const lines = text.trim().split('\n').filter((l)=>l.trim());
            return lines.length === 2 && !text.includes("DELETE");
        }
    },
    {
        id: "stage-4",
        title: "The Motion Formula",
        description: "The VIM motion formula is: <strong>action + count + motion</strong>. For example <kbd>d2w</kbd> deletes 2 words. Practice combining these for powerful editing in very few keystrokes.",
        cheatsheet: [
            {
                key: "d2w",
                desc: "delete 2 words"
            },
            {
                key: "3dd",
                desc: "delete 3 lines"
            },
            {
                key: "y$",
                desc: "yank to end of line"
            },
            {
                key: "p",
                desc: "paste"
            }
        ],
        startText: `The cat sat on the the mat in the the garden`,
        task: `Remove the <span class="target">duplicate words</span>: the two extra <strong>"the"</strong> instances. The result should read: <em>The cat sat on the mat in the garden</em>`,
        check: (text)=>text.trim() === "The cat sat on the mat in the garden"
    },
    {
        id: "stage-5",
        title: "Text Objects",
        description: "Text objects let you select structured pieces of text. <kbd>i</kbd> means <em>inside</em>, <kbd>a</kbd> means <em>around</em>. Use them after <kbd>d</kbd>, <kbd>y</kbd>, or <kbd>v</kbd>: <kbd>diw</kbd> deletes inside word, <kbd>di\"</kbd> deletes inside quotes.",
        cheatsheet: [
            {
                key: "diw",
                desc: "delete inside word"
            },
            {
                key: "di\"",
                desc: "delete inside quotes"
            },
            {
                key: "ci(",
                desc: "change inside parens"
            },
            {
                key: "yiw",
                desc: "yank inside word"
            }
        ],
        startText: `print("Hello, placeholder!")`,
        task: `Change the text inside the quotes to <span class="target">VIM is awesome!</span>. Use <kbd>ci"</kbd> to change inside the double quotes.`,
        check: (text)=>text.trim() === `print("VIM is awesome!")`
    }
];
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyBQjqJVJXpazGfMCXnpEbgHyhOxAV2isBI"),
    authDomain: ("TURBOPACK compile-time value", "vim-in-motion.firebaseapp.com"),
    databaseURL: ("TURBOPACK compile-time value", "https://vim-in-motion-default-rtdb.firebaseio.com/"),
    projectId: ("TURBOPACK compile-time value", "vim-in-motion"),
    storageBucket: ("TURBOPACK compile-time value", "vim-in-motion.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "512346585667"),
    appId: ("TURBOPACK compile-time value", "1:512346585667:web:c3c9441faf90983bd9f2f6")
};
// Initialize Firebase App only once
const app = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])();
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDatabase"])(app);
}),
"[project]/hooks/useFirebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdminDashboard",
    ()=>useAdminDashboard,
    "useFirebasePlayer",
    ()=>useFirebasePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
;
;
;
function useFirebasePlayer(playerName) {
    const [playerData, setPlayerData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFirebaseReady, setIsFirebaseReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [adminUnlockedStageLimit, setAdminUnlockedStageLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only proceed if API key environment variable is available and valid
        if ("TURBOPACK compile-time truthy", 1) {
            setIsFirebaseReady(true);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Listen to admin unlock limits globally
        if (isFirebaseReady) {
            const configRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'config/unlockedStageLimit');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onValue"])(configRef, (snapshot)=>{
                setAdminUnlockedStageLimit(snapshot.val() || 0);
            });
        }
    }, [
        isFirebaseReady
    ]);
    // Save Progress
    const saveProgress = async (stageData)=>{
        if (!isFirebaseReady || !playerName) return;
        // Clean player name to be a valid Firebase Realtime DB key
        const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
        const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `players/${sanitizedName}`);
        const data = {
            name: playerName,
            currentStage: stageData.currentStage,
            completedStages: stageData.completedStages,
            lastActive: Date.now(),
            totalStages: stageData.totalStages
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])(playerRef, data);
    };
    // Load Progress
    const loadProgress = async ()=>{
        if (!isFirebaseReady || !playerName) return null;
        const sanitizedName = playerName.replace(/[.#$[\]]/g, '_');
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `players/${sanitizedName}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            setPlayerData(data);
            return data;
        }
        return null;
    };
    // Log activity
    const logActivity = (msg)=>{
        if (!isFirebaseReady || !playerName) return;
        const activityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'activity');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["push"])(activityRef, {
            time: Date.now(),
            player: playerName,
            msg
        });
    };
    return {
        playerData,
        isFirebaseReady,
        adminUnlockedStageLimit,
        saveProgress,
        loadProgress,
        logActivity
    };
}
function useAdminDashboard(isAdmin) {
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [activityLogs, setActivityLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [unlockedStageLimit, setUnlockedStageLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAdmin) return;
        // Listen to configs
        const configRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'config/unlockedStageLimit');
        const unsubscribeConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onValue"])(configRef, (snapshot)=>{
            setUnlockedStageLimit(snapshot.val() || 0);
        });
        // Listen to all players real-time
        const playersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'players');
        const unsubscribePlayers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onValue"])(playersRef, (snapshot)=>{
            if (snapshot.exists()) {
                setPlayers(snapshot.val());
            } else {
                setPlayers({});
            }
        });
        // Listen to activity log in real-time
        const activityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'activity');
        const unsubscribeActivity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onValue"])(activityRef, (snapshot)=>{
            if (snapshot.exists()) {
                const rawList = snapshot.val();
                const logs = Object.values(rawList).sort((a, b)=>b.time - a.time).slice(0, 20); // Top 20 latest
                setActivityLogs(logs);
            } else {
                setActivityLogs([]);
            }
        });
        return ()=>{
            unsubscribeConfig();
            unsubscribePlayers();
            unsubscribeActivity();
        };
    }, [
        isAdmin
    ]);
    const setGlobalUnlockLimit = (limit)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'config/unlockedStageLimit'), limit);
    };
    return {
        players,
        activityLogs,
        unlockedStageLimit,
        setGlobalUnlockLimit
    };
}
}),
"[project]/app/components/AdminDashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function AdminDashboard({ players, activityLogs, totalLevels, unlockedStageLimit, setGlobalUnlockLimit, onLogout }) {
    const timeAgo = (ts)=>{
        const diff = Math.floor((Date.now() - ts) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
    };
    const fiveMinAgo = Date.now() - 5 * 60 * 1000;
    const playersList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return Object.values(players || {}).sort((a, b)=>(b.completedStages?.length || 0) - (a.completedStages?.length || 0));
    }, [
        players
    ]);
    const activePlayers = playersList.filter((p)=>p.lastActive > fiveMinAgo).length;
    const completedPlayers = playersList.filter((p)=>p.completedStages?.length === totalLevels).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "screen-admin",
        className: "screen active",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "admin-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-logo",
                        children: [
                            "VIM in Motion ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "// Instructor"
                            }, void 0, false, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 33,
                                columnNumber: 51
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AdminDashboard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: ".75rem",
                            alignItems: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-danger",
                            onClick: onLogout,
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/app/components/AdminDashboard.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/AdminDashboard.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/AdminDashboard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "admin-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-sidebar",
                        style: {
                            overflowY: "auto"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-sidebar-title",
                                children: "Players Online"
                            }, void 0, false, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "admin-player-list",
                                children: [
                                    playersList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "var(--muted)",
                                            fontSize: ".75rem"
                                        },
                                        children: "No players yet..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 41
                                    }, this) : null,
                                    playersList.map((p)=>{
                                        const active = p.lastActive > fiveMinAgo;
                                        const stageNum = (p.currentStage || 0) + 1;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "player-card",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pc-name",
                                                    children: [
                                                        active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "online-dot"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 49,
                                                            columnNumber: 55
                                                        }, this),
                                                        p.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 49,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pc-meta",
                                                    children: [
                                                        p.completedStages?.length || 0,
                                                        "/",
                                                        totalLevels,
                                                        " stages done"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pc-stage",
                                                    children: [
                                                        "S",
                                                        stageNum
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 51,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, p.name, true, {
                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                            lineNumber: 48,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AdminDashboard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-stats",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-box",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-val",
                                                children: playersList.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Players Joined"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 62,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-box",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-val",
                                                children: activePlayers
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Active Now"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-box",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn btn-ghost",
                                                        disabled: unlockedStageLimit <= 0,
                                                        onClick: ()=>setGlobalUnlockLimit(Math.max(0, unlockedStageLimit - 1)),
                                                        style: {
                                                            padding: "0.2rem 0.5rem",
                                                            minWidth: "30px"
                                                        },
                                                        children: "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stat-val",
                                                        children: unlockedStageLimit + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn btn-ghost",
                                                        disabled: unlockedStageLimit >= totalLevels - 1,
                                                        onClick: ()=>setGlobalUnlockLimit(Math.min(totalLevels - 1, unlockedStageLimit + 1)),
                                                        style: {
                                                            padding: "0.2rem 0.5rem",
                                                            minWidth: "30px"
                                                        },
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 69,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Max Stage Unlocked"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 84,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-box",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-val",
                                                children: totalLevels
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: "Total Stages"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-table-title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Player Progress"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Player"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Stage"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Progress"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Last Active"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: playersList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 5,
                                                style: {
                                                    color: "var(--muted)",
                                                    textAlign: "center",
                                                    padding: "2rem"
                                                },
                                                children: "Waiting for players to join..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this) : playersList.map((p)=>{
                                            const done = p.completedStages?.length || 0;
                                            const pct = Math.round(done / totalLevels * 100);
                                            const active = p.lastActive > fiveMinAgo;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            fontWeight: 700
                                                        },
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "var(--accent2)"
                                                            },
                                                            children: [
                                                                "S",
                                                                (p.currentStage || 0) + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: ".5rem"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "progress-bar-wrap",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "progress-bar-fill",
                                                                        style: {
                                                                            width: `${pct}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                                        lineNumber: 126,
                                                                        columnNumber: 60
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                                    lineNumber: 126,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: ".7rem",
                                                                        color: "var(--muted)"
                                                                    },
                                                                    children: [
                                                                        pct,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                                    lineNumber: 127,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        children: done === totalLevels ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge badge-green",
                                                            children: "Done"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 132,
                                                            columnNumber: 25
                                                        }, this) : active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge badge-blue",
                                                            children: "Active"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "badge badge-red",
                                                            children: "Idle"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        style: {
                                                            color: "var(--muted)",
                                                            fontSize: ".72rem"
                                                        },
                                                        children: timeAgo(p.lastActive)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, p.name, true, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-log",
                                style: {
                                    height: "180px",
                                    overflowY: "auto"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "live-log-title",
                                        children: "Live Activity Log"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "live-log-entries",
                                        children: [
                                            activityLogs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: "var(--muted)",
                                                    fontSize: ".75rem"
                                                },
                                                children: "No activity yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                                lineNumber: 149,
                                                columnNumber: 44
                                            }, this) : null,
                                            activityLogs.map((e, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "log-entry",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "log-time",
                                                            children: new Date(e.time).toLocaleTimeString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "log-player",
                                                            style: {
                                                                marginLeft: '.5rem',
                                                                marginRight: '.5rem',
                                                                color: "var(--accent2)"
                                                            },
                                                            children: e.player
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "log-msg",
                                                            children: e.msg
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/AdminDashboard.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/app/components/AdminDashboard.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AdminDashboard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AdminDashboard.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AdminDashboard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/AdminDashboard.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/AdminDashboard.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/hooks/useVim.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVim",
    ()=>useVim
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useVim(initialText, onWq, onQuit) {
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialText);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NORMAL");
    const [commandText, setCommandText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cursor, setCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        start: 0,
        end: 0
    });
    const [historyLine, setHistoryLine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bufferRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const clipboardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setText(initialText);
        setHistoryLine([
            initialText
        ]);
        setMode("NORMAL");
        setCursor({
            start: 0,
            end: 0
        });
        bufferRef.current = "";
    }, [
        initialText
    ]);
    const commitHistory = (newText)=>{
        setText(newText);
        setHistoryLine((prev)=>[
                ...prev,
                newText
            ]);
    };
    // Sync cursor visually
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (textareaRef.current) {
            textareaRef.current.setSelectionRange(cursor.start, cursor.end);
        }
    }, [
        cursor,
        text
    ]);
    const updateCursor = (pos)=>{
        const safePos = Math.max(0, Math.min(pos, text.length));
        setCursor({
            start: safePos,
            end: safePos
        });
    };
    const getLineInfo = (pos)=>{
        const lines = text.split("\n");
        let acc = 0;
        for(let i = 0; i < lines.length; i++){
            if (acc + lines[i].length >= pos) {
                return {
                    lineIndex: i,
                    col: pos - acc,
                    lineStart: acc,
                    lineEnd: acc + lines[i].length,
                    text: lines[i]
                };
            }
            acc += lines[i].length + 1; // +1 for newline
        }
        return {
            lineIndex: lines.length - 1,
            col: 0,
            lineStart: acc,
            lineEnd: acc,
            text: ""
        };
    };
    const applyMotion = (pos, motion, count)=>{
        const MAX = text.length;
        let curr = pos;
        for(let c = 0; c < count; c++){
            switch(motion){
                case "h":
                    curr = Math.max(0, curr - 1);
                    break;
                case "l":
                    curr = Math.min(MAX, curr + 1);
                    break;
                case "j":
                    {
                        const info = getLineInfo(curr);
                        const lines = text.split("\n");
                        if (info.lineIndex + 1 < lines.length) {
                            const nextLineStart = info.lineEnd + 1;
                            const nextLineLen = lines[info.lineIndex + 1].length;
                            curr = nextLineStart + Math.min(info.col, nextLineLen);
                        }
                        break;
                    }
                case "k":
                    {
                        const info = getLineInfo(curr);
                        const lines = text.split("\n");
                        if (info.lineIndex - 1 >= 0) {
                            const prevLine = lines[info.lineIndex - 1];
                            const prevLineStart = info.lineStart - prevLine.length - 1;
                            curr = prevLineStart + Math.min(info.col, prevLine.length);
                        }
                        break;
                    }
                case "w":
                    {
                        // move to start of next word
                        while(curr < MAX && /\w/.test(text[curr]))curr++; // skip current word
                        while(curr < MAX && /\W/.test(text[curr]) && text[curr] !== '\n')curr++; // skip spaces
                        break;
                    }
                case "b":
                    {
                        curr = Math.max(0, curr - 1);
                        while(curr > 0 && /\W/.test(text[curr]) && text[curr] !== '\n')curr--; // skip spaces
                        while(curr > 0 && /\w/.test(text[curr - 1]))curr--; // go to word start
                        break;
                    }
                case "e":
                    {
                        curr = Math.min(MAX - 1, curr + 1);
                        while(curr < MAX && /\W/.test(text[curr]) && text[curr] !== '\n')curr++;
                        while(curr < MAX - 1 && /\w/.test(text[curr + 1]))curr++;
                        break;
                    }
                case "$":
                    {
                        const info = getLineInfo(curr);
                        curr = info.lineEnd;
                        break;
                    }
                case "0":
                    {
                        const info = getLineInfo(curr);
                        curr = info.lineStart;
                        break;
                    }
                default:
                    return null; // Not a valid motion
            }
        }
        return curr;
    };
    const applyTextObject = (pos, modifier, obj)=>{
        // simplified
        if (obj === "w") {
            let start = pos;
            while(start > 0 && /\w/.test(text[start - 1]))start--;
            let end = pos;
            while(end < text.length && /\w/.test(text[end]))end++;
            if (modifier === "a") {
                while(end < text.length && text[end] === " ")end++;
            }
            return {
                start,
                end
            };
        }
        if (obj === "(" || obj === ")") {
            const open = text.lastIndexOf("(", pos);
            const close = text.indexOf(")", pos);
            if (open !== -1 && close !== -1) {
                return modifier === "i" ? {
                    start: open + 1,
                    end: close
                } : {
                    start: open,
                    end: close + 1
                };
            }
        }
        if (obj === '"' || obj === "'") {
            const first = text.lastIndexOf(obj, pos - 1);
            const second = text.indexOf(obj, pos);
            if (first !== -1 && second !== -1) {
                return modifier === "i" ? {
                    start: first + 1,
                    end: second
                } : {
                    start: first,
                    end: second + 1
                };
            }
        }
        if (obj === "t" && modifier === "i") {
            const openEnd = text.lastIndexOf(">", pos);
            const closeStart = text.indexOf("</", pos);
            if (openEnd !== -1 && closeStart !== -1 && openEnd < closeStart) {
                return {
                    start: openEnd + 1,
                    end: closeStart
                };
            }
        }
        return null;
    };
    const handleKeyDown = (e)=>{
        let key = e.key;
        if (mode === "COMMAND") {
            e.preventDefault();
            if (key === "Escape") {
                setMode("NORMAL");
                setCommandText("");
                return;
            }
            if (key === "Enter") {
                if (commandText === "wq" && onWq) {
                    onWq(text);
                } else if (commandText === "q" || commandText === "q!") {
                    if (onQuit) {
                        onQuit();
                    } else if (onWq) {
                        onWq(initialText); // or cancel it out entirely without saving
                    }
                }
                setMode("NORMAL");
                setCommandText("");
                return;
            }
            if (key === "Backspace") {
                setCommandText((prev)=>{
                    if (prev.length === 0) {
                        setMode("NORMAL");
                        return "";
                    }
                    return prev.slice(0, -1);
                });
                return;
            }
            if (key.length === 1) {
                setCommandText((prev)=>prev + key);
            }
            return;
        }
        if (mode === "INSERT") {
            if (key === "Escape") {
                e.preventDefault();
                setMode("NORMAL");
                commitHistory(text); // commit the typed text change into history for undo
                updateCursor(Math.max(0, cursor.start - 1));
            }
            return;
        }
        e.preventDefault();
        if (key === "Escape") {
            bufferRef.current = "";
            setMode("NORMAL");
            updateCursor(cursor.start);
            return;
        }
        // Normal mode arrow mapping
        if (key === "ArrowLeft") key = "h";
        if (key === "ArrowDown") key = "j";
        if (key === "ArrowUp") key = "k";
        if (key === "ArrowRight") key = "l";
        // Ignore pure modifier keys
        if ([
            "Shift",
            "Control",
            "Alt",
            "Meta",
            "CapsLock",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(key)) return;
        if (key === ":") {
            setMode("COMMAND");
            setCommandText("");
            bufferRef.current = "";
            return;
        }
        bufferRef.current += key;
        const buf = bufferRef.current;
        // VISUAL MODE
        if (mode === "VISUAL" || mode === "VISUAL_LINE") {
            if (buf === "d" || buf === "y" || buf === "x") {
                const start = Math.min(cursor.start, cursor.end);
                const end = Math.max(cursor.start, cursor.end);
                if (buf === "y") {
                    clipboardRef.current = text.slice(start, end);
                } else {
                    clipboardRef.current = text.slice(start, end);
                    commitHistory(text.slice(0, start) + text.slice(end));
                }
                setMode("NORMAL");
                updateCursor(start);
                bufferRef.current = "";
                return;
            }
            const newPos = applyMotion(cursor.end, key, 1);
            if (newPos !== null) {
                setCursor({
                    start: cursor.start,
                    end: newPos
                });
                bufferRef.current = "";
            }
            return;
        }
        // NORMAL MODE
        // Single immediate actions
        if (buf === "i" || buf === "a" || buf === "v" || buf === "V" || buf === "p" || buf === "u") {
            if (buf === "i") {
                setMode("INSERT");
            } else if (buf === "a") {
                setMode("INSERT");
                updateCursor(cursor.start + 1);
            } else if (buf === "v") {
                setMode("VISUAL");
                setCursor({
                    start: cursor.start,
                    end: cursor.start + 1
                });
            } else if (buf === "V") {
                setMode("VISUAL_LINE");
                const info = getLineInfo(cursor.start);
                setCursor({
                    start: info.lineStart,
                    end: info.lineEnd
                });
            } else if (buf === "p") {
                const paste = clipboardRef.current;
                commitHistory(text.slice(0, cursor.start + 1) + paste + text.slice(cursor.start + 1));
                updateCursor(cursor.start + 1 + paste.length);
            } else if (buf === "u") {
                if (historyLine.length > 1) {
                    const newHistory = historyLine.slice(0, -1);
                    setHistoryLine(newHistory);
                    setText(newHistory[newHistory.length - 1]);
                }
            }
            bufferRef.current = "";
            return;
        }
        // Motions: e.g. w, b, j, k, $
        if (buf.match(/^([hjklwbe$0])$/)) {
            const newPos = applyMotion(cursor.start, buf, 1);
            if (newPos !== null) updateCursor(newPos);
            bufferRef.current = "";
            return;
        }
        // Motion with count
        const motionMatch = buf.match(/^(\d+)([hjklwbe$0])$/);
        if (motionMatch) {
            const count = parseInt(motionMatch[1], 10);
            const motion = motionMatch[2];
            const newPos = applyMotion(cursor.start, motion, count);
            if (newPos !== null) updateCursor(newPos);
            bufferRef.current = "";
            return;
        }
        // action + count + motion : e.g. d3w, y$ 
        const actionMotionMatch = buf.match(/^([dyv])(\d*)([hjklwbe$0])$/);
        if (actionMotionMatch) {
            const action = actionMotionMatch[1];
            const count = actionMotionMatch[2] ? parseInt(actionMotionMatch[2], 10) : 1;
            const motion = actionMotionMatch[3];
            const newPos = applyMotion(cursor.start, motion, count);
            if (newPos !== null) {
                const start = Math.min(cursor.start, newPos);
                const end = Math.max(cursor.start, newPos);
                if (action === "v") {
                    setMode("VISUAL");
                    setCursor({
                        start,
                        end
                    });
                } else {
                    clipboardRef.current = text.slice(start, end);
                    if (action === "d") {
                        commitHistory(text.slice(0, start) + text.slice(end));
                        updateCursor(start);
                    }
                }
            }
            bufferRef.current = "";
            return;
        }
        // action + i/a + object : e.g. diw, vit, ya"
        const actionObjectMatch = buf.match(/^([dyv])([ia])([w()"'t])$/);
        if (actionObjectMatch) {
            const action = actionObjectMatch[1];
            const modifier = actionObjectMatch[2];
            const obj = actionObjectMatch[3];
            const range = applyTextObject(cursor.start, modifier, obj);
            if (range) {
                const { start, end } = range;
                if (action === "v") {
                    setMode("VISUAL");
                    setCursor({
                        start,
                        end
                    });
                } else {
                    clipboardRef.current = text.slice(start, end);
                    if (action === "d") {
                        commitHistory(text.slice(0, start) + text.slice(end));
                        updateCursor(start);
                    }
                }
            }
            bufferRef.current = "";
            return;
        }
        // Two-key same-action e.g. dd, yy
        const doubleMatch = buf.match(/^([dy])\1$/);
        if (doubleMatch) {
            const action = doubleMatch[1];
            const info = getLineInfo(cursor.start);
            // include the newline if possible
            const end = info.lineEnd + (text[info.lineEnd] === '\n' ? 1 : 0);
            clipboardRef.current = text.slice(info.lineStart, end);
            if (action === "d") {
                commitHistory(text.slice(0, info.lineStart) + text.slice(end));
                updateCursor(info.lineStart);
            }
            bufferRef.current = "";
            return;
        }
        // If buffer length is growing too long and doesn't match anything 
        // Wait... what if it's "d3" waiting for "w"?
        const partialMatch = /^[dyv]?\d*[ia]?[w()"'t]?$/.test(buf);
        if (!partialMatch && buf.length > 0) {
            bufferRef.current = ""; // Reset since it's an invalid phrase
        }
    };
    const handleChange = (e)=>{
        if (mode === "INSERT") {
            setText(e.target.value);
            setCursor({
                start: e.target.selectionStart,
                end: e.target.selectionEnd
            });
        }
    };
    const handleSelect = (e)=>{
        if (mode === "INSERT" || mode === "NORMAL") {
            setCursor({
                start: e.target.selectionStart,
                end: e.target.selectionEnd
            });
        }
    };
    return {
        text,
        mode,
        commandText,
        cursor,
        textareaRef,
        handleKeyDown,
        handleChange,
        handleSelect
    };
}
}),
"[project]/hooks/useTerminal.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTerminal",
    ()=>useTerminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const STAGES = Array.from({
    length: 10
}, (_, i)=>`stage-${i + 1}.level`);
const DIRS = {
    "~": [
        "README.md",
        "README.org",
        "levels/"
    ],
    "~/levels": STAGES
};
function resolvePath(currentCwd, target) {
    if (!target || target === "~") return "~";
    // Clean up extra slashes
    target = target.replace(/\/+$/, "");
    if (target.startsWith("~/")) {
        return target;
    }
    if (currentCwd === "~") {
        if (target === "levels") return "~/levels";
        if (target === "levels/") return "~/levels";
        if (target === "README.md" || target === "README.org") return `~/${target}`;
        if (target.startsWith("levels/stage-") && target.endsWith(".level")) return `~/${target}`;
    }
    if (currentCwd === "~/levels") {
        if (target === "..") return "~";
        if (target === "../README.md" || target === "../README.org") return `~/${target.replace("../", "")}`;
        if (target.startsWith("stage-")) return `~/levels/${target}`;
    }
    // Handle explicit up directories from ~
    if (currentCwd === "~" && target === "..") {
        return "~"; // already at top for this simulation
    }
    return null;
}
function useTerminal(user, completedStages, onOpenFile) {
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentInput, setCurrentInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cwd, setCwd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("~");
    const [isTerminal, setIsTerminal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [autocompleteOptions, setAutocompleteOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [autocompleteIndex, setAutocompleteIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [commandHistory, setCommandHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const handleTerminalKeyDown = (e)=>{
        if (autocompleteOptions.length > 0) {
            if (e.key === "Tab" || e.key === "ArrowDown") {
                e.preventDefault();
                setAutocompleteIndex((prev)=>(prev + 1) % autocompleteOptions.length);
                return;
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setAutocompleteIndex((prev)=>(prev - 1 + autocompleteOptions.length) % autocompleteOptions.length);
                return;
            } else if (e.key === "Enter") {
                e.preventDefault();
                const parts = currentInput.split(" ");
                parts[parts.length - 1] = autocompleteOptions[autocompleteIndex];
                setCurrentInput(parts.join(" "));
                setAutocompleteOptions([]);
                return;
            } else if (e.key === "Escape") {
                e.preventDefault();
                setAutocompleteOptions([]);
                return;
            } else {
                // Any other key just dismisses the box and continues typing
                setAutocompleteOptions([]);
            }
        }
        if (e.key === "Tab") {
            e.preventDefault();
            const parts = currentInput.split(" ");
            const currentWord = parts[parts.length - 1];
            let matches = [];
            if (parts.length === 1) {
                // Command completion
                const commands = [
                    "ls",
                    "cd",
                    "cat",
                    "vim",
                    "clear",
                    "sudo",
                    "help",
                    "mkdir"
                ];
                matches = commands.filter((cmd)=>cmd.startsWith(currentWord));
            } else {
                // File completions based on cwd
                const availableFiles = DIRS[cwd] || [];
                matches = availableFiles.filter((f)=>f.startsWith(currentWord));
            }
            if (matches.length === 1) {
                // Auto-complete immediately if only 1 match
                parts[parts.length - 1] = matches[0];
                setCurrentInput(parts.join(" "));
            } else if (matches.length > 1) {
                setAutocompleteOptions(matches);
                setAutocompleteIndex(0);
            }
            return;
        }
        if (e.key === "ArrowUp" && autocompleteOptions.length === 0) {
            e.preventDefault();
            if (commandHistory.length > 0) {
                let nextIndex = historyIndex;
                if (historyIndex === -1) {
                    nextIndex = commandHistory.length - 1;
                } else if (historyIndex > 0) {
                    nextIndex = historyIndex - 1;
                }
                setHistoryIndex(nextIndex);
                setCurrentInput(commandHistory[nextIndex]);
            }
            return;
        }
        if (e.key === "ArrowDown" && autocompleteOptions.length === 0) {
            e.preventDefault();
            if (historyIndex !== -1) {
                const nextIndex = historyIndex + 1;
                if (nextIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setCurrentInput("");
                } else {
                    setHistoryIndex(nextIndex);
                    setCurrentInput(commandHistory[nextIndex]);
                }
            }
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            const command = currentInput.trim();
            if (command) {
                setCommandHistory((prev)=>[
                        ...prev,
                        command
                    ]);
            }
            setHistoryIndex(-1);
            const newHistory = [
                ...history,
                `${user?.name || "anonymous"}@vim-in-motion:${cwd}$ ${command}`
            ];
            if (!command) {
                setHistory(newHistory);
                setCurrentInput("");
                return;
            }
            const args = command.split(" ");
            const baseCmd = args[0];
            switch(baseCmd){
                case "ls":
                    const files = DIRS[cwd] || [];
                    newHistory.push(files.join("   "));
                    break;
                case "cd":
                    const cdTarget = args[1];
                    if (!cdTarget || cdTarget === "~") {
                        setCwd("~");
                    } else {
                        const resolvedDir = resolvePath(cwd, cdTarget);
                        if (resolvedDir && DIRS[resolvedDir]) {
                            setCwd(resolvedDir);
                        } else if (resolvedDir === "~" || resolvedDir === "~/levels") {
                            setCwd(resolvedDir);
                        } else {
                            newHistory.push(`cd: ${cdTarget}: No such file or directory`);
                        }
                    }
                    break;
                case "mkdir":
                    newHistory.push("mkdir: Permission denied.");
                    break;
                case "sudo":
                    if (user?.isAdmin) {
                        newHistory.push("Superuser access granted.");
                    } else {
                        newHistory.push(`User ${user?.name || "anonymous"} is not in the sudoers file. This incident will be reported.`);
                    }
                    break;
                case "cat":
                    const catTarget = args[1];
                    if (!catTarget) {
                        newHistory.push("cat: missing filename");
                    } else {
                        const resolvedPath = resolvePath(cwd, catTarget);
                        if (resolvedPath === "~/README.md" || resolvedPath === "~/README.org") {
                            newHistory.push("#+title: VIM in Motion", "", "* Modes", "- It`s a Modal text editor, where each mode changes what your keys do.", "- Your keys don`t just type, they also serve as different ways of interacting with text through keybinds.", "- In VIM, there are 3 modes.", "** Normal Mode (default)", "- This is where you navigate and edit", "- Keys do actions, not typing", "** Insert Mode", "- This is where you actually type text", "Press ~Esc~ to go back to Normal mode");
                        } else {
                            newHistory.push(`cat: ${catTarget}: No such file or directory`);
                        }
                    }
                    break;
                case "clear":
                    setHistory([]);
                    setCurrentInput("");
                    return;
                case "help":
                    newHistory.push("Available commands:", "  ls     - List directory contents", "  cd     - Change directory", "  cat    - Print file contents", "  vim    - Edit a file (e.g., vim stage-1.level)", "  clear  - Clear terminal output", "  sudo   - Execute a command as superuser", "  help   - Show this help message");
                    break;
                case "vim":
                    const vimTarget = args[1];
                    if (!vimTarget) {
                        newHistory.push("vim: missing filename");
                    } else {
                        const resolvedPath = resolvePath(cwd, vimTarget);
                        if (resolvedPath === "~/README.md" || resolvedPath === "~/README.org") {
                            newHistory.push(`Opening ${vimTarget}...`);
                            if (onOpenFile) {
                                onOpenFile(resolvedPath.replace("~/", ""));
                            }
                            setIsTerminal(false);
                        } else if (resolvedPath && resolvedPath.startsWith("~/levels/stage-")) {
                            newHistory.push(`Opening ${vimTarget}...`);
                            if (onOpenFile) {
                                const stageIdMatch = resolvedPath.match(/stage-(\d+)\.level/);
                                if (stageIdMatch) {
                                    onOpenFile(`stage-${stageIdMatch[1]}.level`);
                                } else {
                                    // Fallback
                                    const targetMatch = vimTarget.match(/stage-(\d+)\.level/);
                                    onOpenFile(targetMatch ? `stage-${targetMatch[1]}.level` : vimTarget);
                                }
                            }
                            setIsTerminal(false);
                        } else {
                            newHistory.push(`vim: ${vimTarget}: File not found or access denied.`);
                        }
                    }
                    break;
                default:
                    newHistory.push(`bash: ${baseCmd}: command not found`);
                    break;
            }
            setHistory(newHistory);
            setCurrentInput("");
        }
    };
    return {
        history,
        setHistory,
        currentInput,
        setCurrentInput,
        cwd,
        setCwd,
        isTerminal,
        setIsTerminal,
        handleTerminalKeyDown,
        autocompleteOptions,
        autocompleteIndex,
        commandHistory,
        historyIndex
    };
}
}),
"[project]/app/components/GameScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/levels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useVim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useVim.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useTerminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useTerminal.ts [app-ssr] (ecmascript)");
;
;
;
;
;
function GameScreen({ user, currentStage, completedStages, adminUnlockedStageLimit, onProgress, logActivity, onLogout }) {
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showWinner, setShowWinner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrollPosition, setScrollPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        scrollTop: 0,
        scrollLeft: 0
    });
    const [showNoArrows, setShowNoArrows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openedReadme, setOpenedReadme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const readmeLevel = {
        id: "readme",
        title: openedReadme || "README",
        description: "Documentation file.",
        cheatsheet: [
            {
                key: ":q",
                desc: "Quit editor"
            }
        ],
        task: "Read the documentation. Type <code>:q</code> and press Enter to return.",
        startText: `#+title: VIM in Motion\n\n* Modes\n- It\`s a Modal text editor, where each mode changes what your keys do.\n- Your keys don\`t just type, they also serve as different ways of interacting with text through keybinds.\n- In VIM, there are 3 modes.\n** Normal Mode (default)\n- This is where you navigate and edit\n- Keys do actions, not typing\n** Insert Mode\n- This is where you actually type text\nPress ~Esc~ to go back to Normal mode`,
        check: (text)=>false
    };
    const level = openedReadme ? readmeLevel : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"][currentStage];
    const handleCheck = (finalText)=>{
        if (!level) return;
        if (openedReadme) {
            setIsTerminal(true);
            return;
        }
        const isPass = level.check(finalText);
        if (isPass) {
            setFeedback({
                type: "success",
                msg: "✓ Correct! Well done."
            });
            const newCompleted = [
                ...completedStages
            ];
            if (!newCompleted.includes(level.id)) {
                newCompleted.push(level.id);
            }
            logActivity(`completed Stage ${currentStage + 1}: ${level.title}`);
            onProgress(currentStage, newCompleted);
            setTimeout(()=>setShowWinner(true), 400);
        } else {
            setFeedback({
                type: "fail",
                msg: "✗ Not quite — check the task description and try again."
            });
        }
    };
    // Initialize VIM Engine
    const vim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useVim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVim"])(level ? level.startText : "", handleCheck, ()=>setIsTerminal(true));
    // Initialize Terminal
    const { history, currentInput, setCurrentInput, cwd, isTerminal, setIsTerminal, handleTerminalKeyDown, autocompleteOptions, autocompleteIndex } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useTerminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTerminal"])(user, completedStages, (filename)=>{
        if (filename === "README.md" || filename === "README.org") {
            setOpenedReadme(filename);
        } else {
            setOpenedReadme(null);
            const stageIdMatch = filename.match(/stage-(\d+)\.level/);
            if (stageIdMatch) {
                const stageIndex = parseInt(stageIdMatch[1], 10) - 1;
                if (!isNaN(stageIndex) && stageIndex >= 0 && stageIndex < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length) {
                    onProgress(stageIndex, completedStages);
                }
            }
        }
    });
    const handleScroll = (e)=>{
        setScrollPosition({
            scrollTop: e.currentTarget.scrollTop,
            scrollLeft: e.currentTarget.scrollLeft
        });
    };
    const handleKeyDownInterceptor = (e)=>{
        // Stage 2 (index 1) arrow key blocking
        if (currentStage === 1 && vim.mode === "NORMAL" && [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ].includes(e.key)) {
            e.preventDefault();
            setShowNoArrows(true);
            setTimeout(()=>setShowNoArrows(false), 2000);
            return; // Do not pass to vim
        }
        // Normal behaviour
        vim.handleKeyDown(e);
    };
    const renderVimOverlay = ()=>{
        if (vim.mode === "INSERT") return null;
        const text = vim.text;
        const curPos = vim.cursor.start;
        const start = Math.min(vim.cursor.start, vim.cursor.end);
        const end = Math.max(vim.cursor.start, vim.cursor.end);
        if (vim.mode === "NORMAL") {
            const before = text.slice(0, curPos);
            const char = text[curPos] || " ";
            const after = text.slice(curPos + 1);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    before,
                    char === "\n" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "vim-cursor",
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this),
                            "\n"
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "vim-cursor",
                        children: char
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this),
                    after
                ]
            }, void 0, true);
        } else {
            // Visual modes
            const before = text.slice(0, start);
            const selectedBody = text.slice(start, end);
            const cursorChar = text[end] || " ";
            const after = text.slice(end + 1);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    before,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "vim-selection",
                        children: selectedBody
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    cursorChar === "\n" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "vim-cursor",
                                children: " "
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            "\n"
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "vim-cursor",
                        children: cursorChar
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this),
                    after
                ]
            }, void 0, true);
        }
    };
    // Reset editor when stage changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (level) {
            setFeedback(null);
            // Auto-focus editor on stage load
            if (vim.textareaRef.current && !isTerminal) {
                vim.textareaRef.current.focus();
            }
        }
    }, [
        currentStage,
        level,
        vim.textareaRef,
        isTerminal
    ]);
    const handleDismissWinner = ()=>{
        setShowWinner(false);
        // Attempt to automatically go to the next stage, but respect locks
        const nextStage = currentStage + 1;
        if (nextStage < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length) {
            const isNextAdminUnlocked = nextStage <= adminUnlockedStageLimit;
            const isNextPrevDone = completedStages.includes(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"][nextStage - 1].id) || level?.id === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"][nextStage - 1].id;
            if (isNextAdminUnlocked && isNextPrevDone) {
                onProgress(nextStage, completedStages);
            }
        }
        // After dismissing, return to the terminal
        setIsTerminal(true);
    };
    if (!level) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "screen-game",
        className: "screen active",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "game-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "logo-sm",
                        children: "VIM ▸ Motion"
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "player-info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "playing as"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "player-name",
                                children: user.name
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-danger btn",
                                onClick: onLogout,
                                style: {
                                    padding: ".3rem .6rem",
                                    fontSize: ".65rem"
                                },
                                children: "exit"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameScreen.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `game-body ${isTerminal ? 'terminal-mode' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `no-arrows-popup ${showNoArrows ? 'show' : ''}`,
                        children: "I said, no arrow keys!"
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "vim-area",
                        children: isTerminal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "terminal-container",
                            style: {
                                flex: 1,
                                padding: "1rem",
                                backgroundColor: "#1e1e1e",
                                color: "#d4d4d4",
                                fontFamily: "monospace",
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column"
                            },
                            children: [
                                history.map((line, i)=>{
                                    if (line.includes("$ ")) {
                                        const parts = line.split("$ ");
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                minHeight: "1.5rem"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginRight: "0.5rem",
                                                        color: "#4af626",
                                                        fontSize: "1rem"
                                                    },
                                                    children: [
                                                        parts[0],
                                                        "$"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/GameScreen.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        flex: 1,
                                                        fontFamily: "inherit",
                                                        fontSize: "1rem",
                                                        whiteSpace: "pre-wrap"
                                                    },
                                                    children: parts.slice(1).join("$ ")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/GameScreen.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 211,
                                            columnNumber: 21
                                        }, this);
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            whiteSpace: "pre-wrap",
                                            fontSize: "1rem",
                                            minHeight: "1.5rem",
                                            display: "flex",
                                            alignItems: "center"
                                        },
                                        children: line
                                    }, i, false, {
                                        fileName: "[project]/app/components/GameScreen.tsx",
                                        lineNumber: 217,
                                        columnNumber: 24
                                    }, this);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        minHeight: "1.5rem",
                                        position: "relative"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                marginRight: "0.5rem",
                                                color: "#4af626",
                                                fontSize: "1rem"
                                            },
                                            children: [
                                                user?.name || "anonymous",
                                                "@vim-in-motion:",
                                                cwd,
                                                "$"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 220,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: currentInput,
                                            onChange: (e)=>setCurrentInput(e.target.value),
                                            onKeyDown: handleTerminalKeyDown,
                                            style: {
                                                background: "transparent",
                                                color: "inherit",
                                                border: "none",
                                                outline: "none",
                                                flex: 1,
                                                fontFamily: "inherit",
                                                fontSize: "1rem",
                                                padding: 0,
                                                margin: 0
                                            },
                                            autoFocus: true,
                                            autoComplete: "off",
                                            spellCheck: "false"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this),
                                        autocompleteOptions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "100%",
                                                left: `${currentInput.length * 0.6}rem`,
                                                backgroundColor: "#252526",
                                                border: "1px solid #4af626",
                                                zIndex: 50,
                                                padding: "0.2rem",
                                                display: "flex",
                                                flexDirection: "column"
                                            },
                                            children: autocompleteOptions.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: "0.2rem 0.5rem",
                                                        backgroundColor: i === autocompleteIndex ? "#4af626" : "transparent",
                                                        color: i === autocompleteIndex ? "#000" : "#d4d4d4",
                                                        cursor: "pointer"
                                                    },
                                                    children: opt
                                                }, i, false, {
                                                    fileName: "[project]/app/components/GameScreen.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/GameScreen.tsx",
                            lineNumber: 206,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                !openedReadme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stage-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stage-num",
                                            children: [
                                                "0",
                                                currentStage + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stage-title",
                                                    children: level.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/GameScreen.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stage-desc",
                                                    dangerouslySetInnerHTML: {
                                                        __html: level.description
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/GameScreen.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 265,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 263,
                                    columnNumber: 17
                                }, this),
                                openedReadme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stage-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stage-title",
                                            children: level.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 274,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stage-desc",
                                            dangerouslySetInnerHTML: {
                                                __html: level.description
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 275,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 273,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cheatsheet",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cs-title",
                                            children: [
                                                "💡 Keys for this ",
                                                openedReadme ? "file" : "stage"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this),
                                        level.cheatsheet.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "key",
                                                        children: c.key
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 33
                                                    }, this),
                                                    " — ",
                                                    c.desc
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 282,
                                                columnNumber: 20
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this),
                                !openedReadme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "task-box",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "task-label",
                                            children: "Your Task"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "task-goal",
                                            dangerouslySetInnerHTML: {
                                                __html: level.task
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this),
                                        feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `feedback ${feedback.type}`,
                                            style: {
                                                display: 'block'
                                            },
                                            children: feedback.msg
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 291,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 287,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "vim-editor-wrap",
                                    "data-mode": vim.mode === "NORMAL" ? "NORMAL" : vim.mode === "COMMAND" ? ":" + vim.commandText : "-- " + vim.mode + " --",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "vim-editor-overlay",
                                            style: {
                                                transform: `translate(${-scrollPosition.scrollLeft}px, ${-scrollPosition.scrollTop}px)`,
                                                marginBottom: `-${scrollPosition.scrollTop}px`,
                                                display: vim.mode === 'INSERT' ? 'none' : 'block'
                                            },
                                            children: renderVimOverlay()
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 299,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "vim-editor",
                                            ref: vim.textareaRef,
                                            spellCheck: false,
                                            value: vim.text,
                                            onChange: vim.handleChange,
                                            onScroll: handleScroll,
                                            onKeyDown: handleKeyDownInterceptor,
                                            onSelect: vim.handleSelect,
                                            onClick: vim.handleSelect,
                                            onKeyUp: vim.handleSelect,
                                            style: {
                                                color: vim.mode !== "INSERT" ? "transparent" : "var(--text)",
                                                caretColor: vim.mode !== "INSERT" ? "transparent" : "var(--accent)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameScreen.tsx",
                                            lineNumber: 309,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    !isTerminal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "game-sidebar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sidebar-tab",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "tab-btn active",
                                    children: "Reference"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameScreen.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 333,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tab-content active",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ref-section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-title",
                                                children: "Modes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 339,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "i"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "insert before cursor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 78
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 340,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "a"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "insert after cursor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 78
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "Esc"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "back to normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 80
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameScreen.tsx",
                                        lineNumber: 338,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ref-section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-title",
                                                children: "Motions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "h j k l"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "← ↓ ↑ →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 84
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 346,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "w / b"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "word forward/back"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 82
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "$ / 0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "end / start of line"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 82
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 348,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameScreen.tsx",
                                        lineNumber: 344,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ref-section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-title",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "d / y / p"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "delete / yank / paste"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 86
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "u / ."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc",
                                                        children: "undo / repeat"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 82
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 353,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameScreen.tsx",
                                        lineNumber: 350,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ref-section",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-title",
                                                children: "Template"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 356,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ref-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-key",
                                                        children: "action+count+mo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 44
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ref-desc"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameScreen.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 92
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameScreen.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameScreen.tsx",
                                        lineNumber: 355,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameScreen.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameScreen.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameScreen.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            showWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "winner-overlay show",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "winner-box",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "winner-title",
                            children: currentStage + 1 < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length ? "🎉 Stage Clear!" : "🏆 All Done!"
                        }, void 0, false, {
                            fileName: "[project]/app/components/GameScreen.tsx",
                            lineNumber: 368,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "winner-sub",
                            children: currentStage + 1 < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length ? currentStage + 1 <= adminUnlockedStageLimit ? `"${level.title}" complete. Ready for the next challenge?` : `"${level.title}" complete. Waiting for Instructor to unlock the next stage...` : "You've completed all stages. You're a VIM ninja! 🥷"
                        }, void 0, false, {
                            fileName: "[project]/app/components/GameScreen.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-primary",
                            style: {
                                marginTop: "1.5rem",
                                width: "auto",
                                padding: ".6rem 2rem"
                            },
                            onClick: handleDismissWinner,
                            children: currentStage + 1 < __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length && currentStage + 1 > adminUnlockedStageLimit ? "Close" : "Continue →"
                        }, void 0, false, {
                            fileName: "[project]/app/components/GameScreen.tsx",
                            lineNumber: 376,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/GameScreen.tsx",
                    lineNumber: 367,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/GameScreen.tsx",
                lineNumber: 366,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/GameScreen.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/levels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useFirebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useFirebase.ts [app-ssr] (ecmascript)");
// Sub-components to keep things relatively clean
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AdminDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AdminDashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$GameScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/GameScreen.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const ADMIN_PASSWORD = "vimworkshop2024";
function Home() {
    const [screen, setScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("login");
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Game state
    const [currentStage, setCurrentStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [completedStages, setCompletedStages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Login inputs
    const [loginName, setLoginName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loginError, setLoginError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [adminPass, setAdminPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [adminError, setAdminError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const { isFirebaseReady, saveProgress, loadProgress, logActivity, adminUnlockedStageLimit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useFirebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFirebasePlayer"])(user?.name);
    const adminData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useFirebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminDashboard"])(user?.isAdmin);
    // Restore session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedUser = localStorage.getItem("vim-session-user");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            if (parsedUser.isAdmin) {
                setScreen("admin");
            } else {
                setScreen("game");
            }
        }
    }, []);
    // --- Handlers ---
    const handleLoginPlayer = async ()=>{
        const name = loginName.trim();
        if (!name) {
            setLoginError("Please enter your name");
            return;
        }
        setLoginError("");
        const newUser = {
            name,
            isAdmin: false
        };
        setUser(newUser);
        localStorage.setItem("vim-session-user", JSON.stringify(newUser));
        setScreen("game");
    };
    const handleLoginAdmin = ()=>{
        if (adminPass !== ADMIN_PASSWORD) {
            setAdminError("Incorrect password");
            return;
        }
        setAdminError("");
        const newUser = {
            name: "Instructor",
            isAdmin: true
        };
        setUser(newUser);
        localStorage.setItem("vim-session-user", JSON.stringify(newUser));
        setScreen("admin");
    };
    const handleLogout = ()=>{
        setUser(null);
        setCurrentStage(0);
        setCompletedStages([]);
        setLoginName("");
        setAdminPass("");
        setScreen("login");
        localStorage.removeItem("vim-session-user");
    };
    // Automatically wrap load progress on user set
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user && !user.isAdmin && isFirebaseReady) {
            loadProgress().then((saved)=>{
                if (saved) {
                    setCurrentStage(saved.currentStage || 0);
                    setCompletedStages(saved.completedStages || []);
                } else {
                    // Initialize new game progress
                    saveProgress({
                        currentStage: 0,
                        completedStages: [],
                        totalStages: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length
                    });
                    logActivity("joined the workshop");
                }
            });
        }
    }, [
        user,
        isFirebaseReady
    ]);
    // Sync state upward when game ticks
    const onGameProgress = (newStage, newCompleted)=>{
        setCurrentStage(newStage);
        setCompletedStages(newCompleted);
        saveProgress({
            currentStage: newStage,
            completedStages: newCompleted,
            totalStages: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "screen-login",
                className: `screen ${screen === "login" ? "active" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "login-bg"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "login-box",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "logo",
                                children: [
                                    "VIM ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "in"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 37
                                    }, this),
                                    " Motion"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tagline",
                                children: "// workshop · learn by doing"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "field-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "Your Name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "e.g. ada_lovelace",
                                        value: loginName,
                                        onChange: (e)=>setLoginName(e.target.value),
                                        onKeyDown: (e)=>e.key === 'Enter' && handleLoginPlayer()
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                onClick: handleLoginPlayer,
                                children: "Join Workshop →"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            loginError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "error-msg",
                                style: {
                                    display: 'block'
                                },
                                children: loginError
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 26
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-toggle",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Conducting the workshop?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-ghost",
                                        onClick: ()=>setScreen("admin-login"),
                                        children: "Instructor Login"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "screen-admin-login",
                className: `screen ${screen === "admin-login" ? "active" : ""}`,
                style: {
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "login-box",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "logo",
                            style: {
                                fontSize: "2rem"
                            },
                            children: [
                                "Instructor ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Panel"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 70
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tagline",
                            children: "// admin access only"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "field-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: "Admin Password"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "••••••••",
                                    value: adminPass,
                                    onChange: (e)=>setAdminPass(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && handleLoginAdmin()
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-primary",
                            onClick: handleLoginAdmin,
                            children: "Enter Dashboard →"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        adminError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "error-msg",
                            style: {
                                display: 'block'
                            },
                            children: adminError
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 149,
                            columnNumber: 26
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "admin-toggle",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-ghost",
                                onClick: ()=>setScreen("login"),
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            screen === "game" && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$GameScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                currentStage: currentStage,
                completedStages: completedStages,
                adminUnlockedStageLimit: adminUnlockedStageLimit,
                onProgress: onGameProgress,
                logActivity: logActivity,
                onLogout: handleLogout
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this),
            screen === "admin" && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AdminDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                players: adminData.players,
                activityLogs: adminData.activityLogs,
                totalLevels: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$levels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].length,
                unlockedStageLimit: adminData.unlockedStageLimit,
                setGlobalUnlockLimit: adminData.setGlobalUnlockLimit,
                onLogout: handleLogout
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__07-pbe5._.js.map