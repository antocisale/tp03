try {
    const jsGetEmployees = require('./getEmployees');
    const modEmployee = require('./modify-employee'),
        modifyEmployee = modEmployee.modifyEmployee,
        baseUrl = jsGetEmployees.baseUrl,
        employees = jsGetEmployees.employees,
        handleError = jsGetEmployees.handleError,
        getEmployees = jsGetEmployees.getEmployees;
    const del = require('./delete'),
        deleteEmployee = del.deleteEmployee;
} catch (e) { }


const getEmployeesHTML = () => {
    const table = document.querySelector("#employees-list");
    table.innerHTML = "";
    employees.map(employee => {
        let row = document.createElement("tr");
        let tdSelect = createSelectButton();
        tdSelect.id = employee.id;

        let cellName = document.createElement("td");
        cellName.innerHTML = employee.fullname;

        let cellMail = document.createElement("td");
        cellMail.innerHTML = employee.email;

        let cellAddress = document.createElement("td");
        cellAddress.innerHTML = employee.address;

        let cellPhone = document.createElement("td");
        cellPhone.innerHTML = employee.phone;

        let cellActions = employeesActions(employee.id); //acciones de empleados por cada uno

        row.appendChild(tdSelect);
        row.appendChild(cellName);
        row.appendChild(cellMail);
        row.appendChild(cellAddress);
        row.appendChild(cellPhone);
        row.appendChild(cellActions);
        table.appendChild(row);

    })
};

const createSelectButton = () => {
    let cell = document.createElement("td");
    const select = document.createElement("label");
    select.classList.add("check");
    const icon1 = document.createElement("i");
    icon1.classList.add("material-icons");
    icon1.classList.add("unchecked")
    icon1.innerHTML = "check_box_outline_blank";
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("checkbox");
    const icon2 = document.createElement("i");
    icon2.classList.add("material-icons");
    icon2.classList.add("checked")
    icon2.innerHTML = "check_box";
    select.appendChild(icon1);
    select.appendChild(input);
    select.appendChild(icon2);
    cell.appendChild(select);
    return cell;
}

const employeesActions = (id) => {
    let cell = document.createElement("td");
    let iconEdit = createEditButton(id);
    let iconDelete = createDeleteButton(id);
    cell.appendChild(iconEdit);
    cell.appendChild(iconDelete);
    return cell;
}

const createEditButton = () => {
    let button = document.createElement("button");
    button.classList.add("transparent-button");
    let iconEdit = document.createElement("i");
    iconEdit.setAttribute("title", "Edit");
    iconEdit.classList.add("material-icons", "yellow");
    iconEdit.innerHTML = "&#xE254";
    button.appendChild(iconEdit);

    button.addEventListener("click", () => {
        activateModal(document.querySelector("#modal-edit"));
        let id = button.parentElement.parentElement.firstChild.id; 
        let botoneditar = document.querySelector("#edit-save-button");
        console.log(id);
        botoneditar.addEventListener("click",()=>{
            let fullname = document.querySelector("#name-edit").value;
            let email = document.querySelector("#email-edit").value;
            let address = document.querySelector("#Address-edit").value;
            let phone = document.querySelector("#Phone-edit").value;

            modifyEmployee(id, fullname, email, address, phone);
            console.log(id);
            getEmployees();
            botoneditar.parentElement.parentElement.classList.add("slide-out-top");
            botoneditar.parentElement.parentElement.parentElement.classList.add("fade-out");
            setTimeout(()=>{
                botoneditar.parentElement.parentElement.parentElement.classList.remove("overlay");
                botoneditar.parentElement.parentElement.parentElement.classList.remove("fade-out");
                botoneditar.parentElement.parentElement.classList.remove("slide-out-top");
                }, 500)
        });
    });
    return button;
}

const createDeleteButton = idaelim => {
    let button = document.createElement("button");
    button.classList.add("transparent-button");
                let iconDelete = document.createElement("i");
                iconDelete.setAttribute("title", "Delete");
                iconDelete.classList.add("material-icons", "red");
                iconDelete.innerHTML = "&#xE872";
    button.appendChild(iconDelete);
    button.addEventListener("click", () => {
        activateModal(document.querySelector("#modal-delete"));
        let botonelim = document.querySelector("#delete-button"); // llama al boton eliminar que esta en el modal
        botonelim.addEventListener("click",()=>{
            botonelim.parentElement.parentElement.classList.add("slide-out-top");
            botonelim.parentElement.parentElement.parentElement.classList.add("fade-out");
            deleteEmployee(idaelim);
            console.log(idaelim);
            idaelim="";
            setTimeout(()=>{
            botonelim.parentElement.parentElement.parentElement.classList.remove("overlay");
            botonelim.parentElement.parentElement.parentElement.classList.remove("fade-out");
            botonelim.parentElement.parentElement.classList.remove("slide-out-top");
            }, 500)
        });
    });
    return button;
}

const activateModal = (sectiontoChange) => {
        sectiontoChange.classList.add("overlay");
    }


    ///////////// FUNCIONES DEL BOTON "AGREGAR EMPLEADO - PARA HACER QUE FUNCIONE EL MODAL"
    let addButton = document.querySelector("#addEmployee");
    addButton.addEventListener("click", () => {
        activateModal(document.querySelector("#modal-add"));
        ///OTRAS FUNCIONES DE AGREGAR
    })
    ///////////////////////////////////////////

    ////////////FUNCIONES DEL BOTON "ELIMINAR TODO - PARA HACER QUE FUNCIONE EL MODAL"
    let deleteAllButton = document.querySelector("#button-delete-all");
    deleteAllButton.addEventListener("click", () => {
        activateModal(document.querySelector("#modal-delete"));
        ///OTRAS FUNCIONES DE ELIMINAR
    })

    try {
        module.exports = {
            getEmployeesHTML,
        }
    } catch (e) { }