## Решение 2: Базовое кодирование (Base Encoding)
* Использовать нестандартную систему счисления (например, Base36), чтобы представить числа компактнее. Числа в диапазоне от 1 до 300 будут занимать меньше места в Base36. Код (javascript):

function serializeBase(numbers) {
    return numbers.map(num => num.toString(36)).join(',');
}

function deserializeBase(serialized) {
    return serialized.split(',').map(part => parseInt(part, 36));
}
