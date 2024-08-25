document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        
        const taskText = document.createElement('span');
        taskText.textContent = taskValue;
        li.appendChild(taskText);

        // Marquer comme complété
        taskText.addEventListener('click', function() {
            li.classList.toggle('completed');
        });

        // Boutons d'édition et de suppression
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'task-buttons';

        const editButton = document.createElement('button');
        editButton.textContent = 'Éditer';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', function() {
            editTask(li, taskText);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        li.appendChild(buttonsDiv);

        taskList.appendChild(li);
        taskInput.value = ''; // Réinitialiser le champ
    }
}

function editTask(li, taskText) {
    const currentText = taskText.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    
    li.classList.add('editing');
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();

    input.addEventListener('blur', function() {
        finishEditing(li, input);
    });

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            finishEditing(li, input);
        }
    });
}

function finishEditing(li, input) {
    const newText = input.value.trim();
    li.classList.remove('editing');
    li.innerHTML = '';

    if (newText) {
        const taskText = document.createElement('span');
        taskText.textContent = newText;
        li.appendChild(taskText);

        // Recréer les boutons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'task-buttons';

        const editButton = document.createElement('button');
        editButton.textContent = 'Éditer';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', function() {
            editTask(li, taskText);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            li.parentNode.removeChild(li);
        });

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        li.appendChild(buttonsDiv);

        // Réattacher l'événement pour marquer comme complété
        taskText.addEventListener('click', function() {
            li.classList.toggle('completed');
        });
    } else {
        // Si le texte est vide après édition, supprimer la tâche
        li.parentNode.removeChild(li);
    }
}