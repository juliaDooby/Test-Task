## Решение 3: Разность между числами (Delta Encoding)
* Хранить разность между числами вместо самих чисел, что позволяет уменьшить размер строки при большом количестве подряд идущих чисел. Код (javascript):

function serializeDelta(numbers) {
    numbers.sort((a, b) => a - b); // Сортируем числа
    let deltas = [numbers[0]];
    for (let i = 1; i < numbers.length; i++) {
        deltas.push(numbers[i] - numbers[i - 1]);
    }
    return deltas.map(num => num.toString(36)).join(',');
}

function deserializeDelta(serialized) {
    let deltas = serialized.split(',').map(part => parseInt(part, 36));
    let numbers = [deltas[0]];
    for (let i = 1; i < deltas.length; i++) {
        numbers.push(numbers[i - 1] + deltas[i]);
    }
    return numbers;
}
