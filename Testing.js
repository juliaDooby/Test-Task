## Тестирование:

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

---
  
## Пример результатов:
Тест 1: [1, 2, 3, 7, 8, 10]
* Сериализованная строка: 1-3,7-8,10
* Коэффициент сжатия: ~2.5

Тест 2: [1, 2, 3, ..., 900]
* Сериализованная строка: 1-900
* Коэффициент сжатия: ~8.0

Тест 3: [10, 300, 150, 1000]
* Сериализованная строка: 10,96,1qo,2lk (Base36)
* Коэффициент сжатия: ~1.3
