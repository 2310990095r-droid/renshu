/* ================================================= */
/* log.js                      */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-log-btn');
    const exerciseSelect = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsSelect = document.getElementById('reps');
    const setsSelect = document.getElementById('sets');
    const pastLogsContainer = document.getElementById('past-logs');

    if (!addButton || !pastLogsContainer) return; 

    const LOG_STORAGE_KEY = 'trainingLogs';

    // ログをlocalStorageに保存
    function saveLogs(logs) {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    }

    // ログをlocalStorageからロードし、HTMLに表示する
    function loadLogs() {
        pastLogsContainer.innerHTML = '';
        
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let logs = [];
        
        if (storedLogs) {
             logs = JSON.parse(storedLogs).map(log => {
                 if (!log.id) {
                     log.id = Date.now() + Math.floor(Math.random() * 1000); 
                 }
                 return log;
             });
        } 
        
        // ログをHTMLに表示（ロード時は時系列順）
        logs.forEach(log => {
            appendLogToHTML(log, false); 
        });
    }
    
    // ログエントリをHTMLに追加する
    function appendLogToHTML(log, prepend = true) {
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        newLogEntry.dataset.logId = log.id; 

        const header = document.createElement('strong');
        header.textContent = `${log.date} - ${log.part}`;
        newLogEntry.appendChild(header);

        const detailP = document.createElement('p');
        detailP.textContent = log.detail;
        newLogEntry.appendChild(detailP);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-log-btn');
        deleteBtn.textContent = '削除';
        deleteBtn.addEventListener('click', handleDeleteLog);
        newLogEntry.appendChild(deleteBtn);

        if (prepend && pastLogsContainer.firstElementChild) {
            pastLogsContainer.insertBefore(newLogEntry, pastLogsContainer.firstElementChild);
        } else {
            pastLogsContainer.appendChild(newLogEntry);
        }
    }

    // ログ削除処理
    function handleDeleteLog(event) {
        const logEntry = event.target.closest('.log-entry');
        const logIdToDelete = parseInt(logEntry.dataset.logId); 
        
        if (isNaN(logIdToDelete) || !confirm('このログを削除してもよろしいですか？')) {
            return;
        }

        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = storedLogs ? JSON.parse(storedLogs) : [];
        
        const updatedLogs = currentLogs.filter(log => parseInt(log.id) !== logIdToDelete);
        
        saveLogs(updatedLogs); 
        logEntry.remove();
        
        alert('ログを削除しました。');
    }

    // ページロード時の初期化
    loadLogs();
    
    // ログ記録時の処理
    addButton.addEventListener('click', function() {
        const exerciseText = exerciseSelect.options[exerciseSelect.selectedIndex].text;
        const exerciseValue = exerciseSelect.value;
        const exerciseName = exerciseText.split(' ')[0]; 
        const weight = parseInt(weightInput.value);
        const reps = parseInt(repsSelect.value);
        const sets = parseInt(setsSelect.value);
        
        if (isNaN(weight) || weight < 0 || isNaN(reps) || reps <= 0 || isNaN(sets) || sets <= 0) {
             alert('重量、回数、セット数は正しく入力してください。');
             return;
        }

        // 日付と部位の判定ロジック
        const now = new Date();
        const dateString = now.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');
        const dayOfWeek = now.toLocaleDateString('ja-JP', { weekday: 'short' });
        const fullDate = `${dateString} (${dayOfWeek})`;
        
        let part = 'その他';
        const optGroups = {
            '胸': ['benchpress', 'incline_press', 'dumbbell_press', 'pec_fly', 'push_up'],
            '背中': ['deadlift', 'latpulldown', 'bentover_row', 'seated_row', 'pull_up'],
            '脚': ['squat', 'leg_press', 'romanian_deadlift', 'leg_extension', 'leg_curl', 'calf_raise'],
            '肩': ['shoulderpress', 'side_raise', 'front_raise', 'reverse_fly'],
            '腕': ['armcurl', 'triceps_extension', 'hammer_curl', 'cable_pushdown'],
            '体幹': ['crunch', 'leg_raise', 'plank', 'russian_twist']
        };

        for (const p in optGroups) {
            if (optGroups[p].includes(exerciseValue)) {
                part = p;
                break;
            }
        }

        const weightDisplay = (weight > 0) ? `${weight}kg` : '自重';
        const detailString = `${exerciseName}: ${weightDisplay} × ${reps}回 × ${sets}セット`;

        // 新しいログオブジェクトを作成
        const newLog = {
            id: Date.now(), 
            date: fullDate,
            exerciseValue: exerciseValue, 
            weight: weight,
            reps: reps,
            sets: sets,
            part: part,
            detail: detailString
        };
        
        // localStorageのデータを更新
        const currentLogsString = localStorage.getItem(LOG_STORAGE_KEY);
        let currentLogs = currentLogsString ? JSON.parse(currentLogsString) : [];
        currentLogs.unshift(newLog);
        saveLogs(currentLogs);

        // HTMLに表示 (先頭に追加)
        appendLogToHTML(newLog, true);
        
        // 入力値をリセット
        weightInput.value = '60'; 
        repsSelect.value = '10';
        setsSelect.value = '3';
        exerciseSelect.value = 'benchpress';
        
        alert('トレーニングログを記録しました！ 💪');
    });
});
