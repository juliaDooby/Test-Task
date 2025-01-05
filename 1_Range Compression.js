## Решение 1: Ранжирование (Range Compression)
* Объединить последовательные числа в диапазоны. Например, массив [1, 2, 3, 7, 8, 10] преобразуется в строку 1-3,7-8,10. Код (javascript):

function serializeRange(numbers) {
    numbers.sort((a, b) => a - b); // Сортируем числа
    let ranges = [];
    let start = numbers[0], end = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === end + 1) {
            end = numbers[i];
        } else {
            ranges.push(start === end ? `${start}` : `${start}-${end}`);
            start = end = numbers[i];
        }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges.join(',');
}

function deserializeRange(serialized) {
    let result = [];
    serialized.split(',').forEach(part => {
        if (part.includes('-')) {
            let [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) result.push(i);
        } else {
            result.push(Number(part));
        }
    });
    return result;
}

