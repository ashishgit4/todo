document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const emptyImage = document.getElementById('empty-image');
  const todoContainer = document.querySelector('.todo-container');
  const progressbar = document.getElementById('progress');
  const progressnumber  = document.getElementById('numbers');


const ToggleEmptyState = () => {
   emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
   todoContainer.style.width = taskList.children.length   > 0 ? '100%' : '50%';
};

const updateProgress   = (checkCompletion = true) => {
const totaltask = taskList.children.length;
const completedTasks =  taskList.querySelectorAll('.checkbox:checked').length

progressbar.style.width =totaltask ? `${(completedTasks /totaltask) * 100}%` : '0%';
progressnumber.textContent = `${completedTasks}/${totaltask}`;

if(checkCompletion && totaltask  > 0 && completedTasks === totaltask){
  Confetti();
}
};


const saveTasktoLocalStorage = () => {
    const tasks  = Array.from(taskList.querySelectorAll('li')).map(li => ({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('.checkbox').checked
    }));

    localStorage.setItem('tasks'  ,JSON.stringify(tasks));
};

  const LoadTaskFromLocalStorage  = () => {
    const savedTasks  = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(({text , completed}) => addTask(text ,completed ,false));
    ToggleEmptyState();
    updateProgress();
  }
  const addTask = (text , completed =  false ,
    checkCompletion = true) => {
    const taskText =text ||  taskInput.value.trim();
    if (!taskText) {
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
    <input type= "checkbox" class ="checkbox"  ${completed ?  'checked'  : ''}>
    <span>${taskText}</span>
    <div class = "task-buttons">
        <button class="edit-btn"><i class="ri-pencil-fill"></i></button>
        <button class="delete-btn"><i class="ri-delete-bin-line"></i></button>
    </div>
    `;

    

    const checkbox = li.querySelector('.checkbox');
    const editBtn =  li.querySelector('.edit-btn');

    if(completed){
      li.classList.add('completed');
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
      editBtn.style.pointerEvents = 'none'; 
    }

    checkbox.addEventListener('change'  , () => {
      const isChecked = checkbox.checked;
      li.classList.toggle('completed' ,isChecked);
      editBtn.disabled   =  isChecked;
      editBtn.style.opacity  = isChecked  ? '0.5' :'1';
      editBtn.style.pointerEvents = isChecked  ? 'none' : 'auto';
      updateProgress();
      saveTasktoLocalStorage();
    })

    editBtn.addEventListener('click' ,() => {
      if(!checkbox.checked){
        taskInput.value = li.querySelector('span').textContent;
      li.remove();
      ToggleEmptyState();
      updateProgress(false);
      saveTasktoLocalStorage();
      }
    })
   

    li.querySelector('.delete-btn').addEventListener('click' , () => {
      li.remove();
      ToggleEmptyState();
      updateProgress();
      saveTasktoLocalStorage();
    });

     taskList.appendChild(li);
    taskInput.value = "";
    ToggleEmptyState();
    updateProgress(checkCompletion);

    
  };

  addTaskBtn.addEventListener("click", () =>  addTask());
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      addTask();
    }
  });

  LoadTaskFromLocalStorage();
});


const Confetti = ()  => {
const count = 350,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
};



//toggle-mode
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const icon = toggleButton.querySelector("i");

  const setIcon = (isDark) => {
    icon.classList.remove("ri-sun-line", "ri-moon-line");
    icon.classList.add(isDark ? "ri-moon-line" : "ri-sun-line");
  };

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  const isDarkInitially = savedTheme === "dark";
  document.body.classList.toggle("dark-mode", isDarkInitially);
  setIcon(isDarkInitially);

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setIcon(isDark);
  });
});
