// метод для отримання даних з API
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const userListElement = document.getElementById('userList');

        users.forEach(user => {
            // Створюємо блок для кожного user
            const userBlock = document.createElement('div');
            userBlock.classList.add('userBlock');

            // Додаємо інформацію про user
            userBlock.innerHTML = `<p>ID: ${user.id}</p><p>Name: ${user.name}</p>`;

            // Додаємо кнопку з посиланням на сторінку user-details.html
            const userButton = document.createElement('a');
            userButton.classList.add('userButton');
            userButton.textContent = 'Details';
            userButton.href = `user_details.html?id=${user.id}`;

            // Додаємо блок і кнопку на сторінку
            userBlock.appendChild(userButton);
            userListElement.appendChild(userBlock);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
