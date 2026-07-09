async function getTasks() {
    try {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const tasks = await response.json();
        console.log(tasks);

    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
}

// Вызов функции
getTasks();