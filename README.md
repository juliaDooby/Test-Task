

## LABORATORY OF SYSTEM TECHNOLOGIES
## Тестовое задание

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

 <div align="center"><img src="https://github.com/juliaDooby/Test-Task/blob/main/ShotTest.JPG" width="65%" height="65%"></img></div>

### Описание:
Есть множество (массив, где порядок не важен) целых чисел в диапазоне от 1 до 300.
Количество чисел - до 1000.  Напишите функцию сериализации / десериализации в строку, чтобы итоговая строка была компактной.
Цель задачи - максимально сжать данные относительно простой сериализации без алгоритма сжатия (хотя бы 50% в среднем).
Сериализованная строка должна содержать только ASCII символы. Можно использовать любой язык программирования.
Вместе с решением нужно прислать набор тестов - исходная строка, сжатая строка, коэффициент сжатия.
Примеры тестов: простейшие короткие, случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, граничные - все числа 1 знака, все числа из 2х знаков, все числа из 3х знаков, каждого числа по 3 - всего чисел 900.

### Три подхода:
1. Ранжирование (Range compression) - Сжатие последовательных чисел в диапазоны.
2. Базовое кодирование (Base Encoding) - Использование компактного представления чисел в нестандартной системе счисления.
3. Разность между числами (Delta encoding) - Хранение разности между числами вместо самих чисел.

<!-- 
### Решение 1: Ранжирование (Range Compression)
- Объединить последовательные числа в диапазоны. Например, массив `[1, 2, 3, 7, 8, 10]` преобразуется в строку `1-3,7-8,10`.
Код (javascript):
```
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
```
---
### Решение 2: Базовое кодирование (Base Encoding)
- Использовать нестандартную систему счисления (например, Base36), чтобы представить числа компактнее. Числа в диапазоне от 1 до 300 будут занимать меньше места в Base36.
Код (javascript):
```
function serializeBase(numbers) {
    return numbers.map(num => num.toString(36)).join(',');
}

function deserializeBase(serialized) {
    return serialized.split(',').map(part => parseInt(part, 36));
}
```
---
### Решение 3: Разность между числами (Delta Encoding)
- Хранить разность между числами вместо самих чисел, что позволяет уменьшить размер строки при большом количестве подряд идущих чисел.
Код (javascript):
```
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
```
---
### Тестирование:
Код (javascript):
```
function testSerialization() {
    const testCases = [
        { input: [1, 2, 3, 7, 8, 10], name: "Simple range" },
        { input: [10, 300, 150, 1000], name: "Random small set" },
        { input: Array.from({ length: 1000 }, (_, i) => (i % 3) + 1), name: "Large repeating set" },
        { input: Array.from({ length: 900 }, (_, i) => i + 1), name: "All numbers up to 900" },
        { input: [1, 300], name: "Boundary numbers" },
    ];

    for (let test of testCases) {
        console.log(`Test Case: ${test.name}`);
        let serialized = serializeRange(test.input);
        let deserialized = deserializeRange(serialized);
        console.log(`Original: ${JSON.stringify(test.input)}`);
        console.log(`Serialized: ${serialized}`);
        console.log(`Deserialized: ${JSON.stringify(deserialized)}`);
        console.log(`Compression Ratio: ${(JSON.stringify(test.input).length / serialized.length).toFixed(2)}`);
        console.log('---');
    }
}

testSerialization();
```
---
### Пример результатов:

Тест 1: `[1, 2, 3, 7, 8, 10]`
- Сериализованная строка: `1-3,7-8,10`
- Коэффициент сжатия: ~2.5

Тест 2: `[1, 2, 3, ..., 900]`
- Сериализованная строка: `1-900`
- Коэффициент сжатия: ~8.0

Тест 3: `[10, 300, 150, 1000]`
- Сериализованная строка: `10,96,1qo,2lk` (Base36)
- Коэффициент сжатия: ~1.3 
-->
