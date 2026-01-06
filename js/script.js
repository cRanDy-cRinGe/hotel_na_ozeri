document.addEventListener("DOMContentLoaded", function() {

    // 1. Календар (Flatpickr)
    flatpickr(".date-picker", {
        locale: "uk",
        dateFormat: "Y-m-d",
        minDate: "today",
        animate: true,
        disableMobile: "true",
        allowInput: true, // Дозволяє вводити вручну, але відкриває календар
        onOpen: function(selectedDates, dateStr, instance) {
            // Стилізація при відкритті (опціонально)
        }
    });

    // 2. Custom Select Logic
    const customSelectWrappers = document.querySelectorAll(".custom-select-wrapper");

    customSelectWrappers.forEach(wrapper => {
        const selectEl = wrapper.querySelector("select");
        if (!selectEl) return;

        // Створення відображуваного елемента (заголовок)
        const selectedDiv = document.createElement("DIV");
        selectedDiv.setAttribute("class", "select-selected");
        selectedDiv.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
        wrapper.appendChild(selectedDiv);

        // Створення списку опцій
        const optionsDiv = document.createElement("DIV");
        optionsDiv.setAttribute("class", "select-items select-hide");

        Array.from(selectEl.options).forEach((option, index) => {
            const itemDiv = document.createElement("DIV");
            itemDiv.innerHTML = option.innerHTML;

            // Клік на опцію
            itemDiv.addEventListener("click", function() {
                selectEl.selectedIndex = index;
                selectedDiv.innerHTML = this.innerHTML;

                // Оновлення класів (підсвітка вибраного)
                const sameAsSelected = optionsDiv.querySelectorAll(".same-as-selected");
                sameAsSelected.forEach(el => el.classList.remove("same-as-selected"));
                this.classList.add("same-as-selected");

                selectedDiv.click(); // Закрити список
            });
            optionsDiv.appendChild(itemDiv);
        });

        wrapper.appendChild(optionsDiv);

        // Клік на головний блок (відкрити/закрити)
        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelects(this);
            optionsDiv.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    });

    // Функція закриття всіх списків
    function closeAllSelects(elmnt) {
        const items = document.getElementsByClassName("select-items");
        const selected = document.getElementsByClassName("select-selected");
        const arrNo = [];

        for (let i = 0; i < selected.length; i++) {
            if (elmnt == selected[i]) {
                arrNo.push(i)
            } else {
                selected[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < items.length; i++) {
            if (arrNo.indexOf(i)) {
                items[i].classList.add("select-hide");
            }
        }
    }

    // Закрити при кліку в будь-якому місці
    document.addEventListener("click", closeAllSelects);
});