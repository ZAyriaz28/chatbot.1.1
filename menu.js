document.addEventListener("DOMContentLoaded", function() {
    const chatSection = document.getElementById("chatSection");
    const doctorSection = document.getElementById("doctorSection");
    const patientRegistrationSection = document.getElementById("patientRegistrationSection");
    const chatLink = document.getElementById("chatLink");
    const doctorLink = document.getElementById("doctorLink");
    const patientsList = document.createElement("div");
    patientsList.className = "patients-list";
    patientRegistrationSection.appendChild(patientsList);

    // Mostrar Chat Médico por defecto
    chatSection.style.display = "block";

    // Alternar secciones de Chat Médico y Doctores
    chatLink.addEventListener("click", function() {
        chatSection.style.display = "block";
        doctorSection.style.display = "none";
        patientRegistrationSection.style.display = "none";
    });

    doctorLink.addEventListener("click", function() {
        chatSection.style.display = "none";
        doctorSection.style.display = "block";
        patientRegistrationSection.style.display = "none";
    });

    // Función de autenticación para el acceso de doctores
    document.getElementById('loginButton').addEventListener('click', function() {
        const user = document.getElementById('doctorUser').value;
        const password = document.getElementById('doctorPassword').value;

        if (user === "doctor" && password === "12345") { // Ejemplo de autenticación
            alert("Acceso concedido");
            doctorSection.style.display = "none";
            patientRegistrationSection.style.display = "block";
            loadPatients();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    // Guardar datos del paciente en Local Storage
    document.getElementById('savePatientButton').addEventListener('click', function() {
        const name = document.getElementById('patientName').value;
        const age = document.getElementById('patientAge').value;
        const dob = document.getElementById('patientDOB').value;
        const symptoms = document.getElementById('patientSymptoms').value;
        const analysis = document.getElementById('patientAnalysis').value;

        if (name && age && dob && symptoms && analysis) {
            const patient = {
                name,
                age,
                dob,
                symptoms,
                analysis
            };

            // Guardar en Local Storage
            let patients = JSON.parse(localStorage.getItem("patients")) || [];
            patients.push(patient);
            localStorage.setItem("patients", JSON.stringify(patients));
            
            alert("Paciente guardado con éxito");
            document.getElementById("patientForm").reset(); // Limpiar el formulario
            loadPatients(); // Actualizar la lista de pacientes
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Función para cargar y mostrar pacientes guardados
    function loadPatients() {
        patientsList.innerHTML = "<h3>Lista de Pacientes</h3>";
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        if (patients.length === 0) {
            patientsList.innerHTML += "<p>No hay pacientes registrados.</p>";
        } else {
            patients.forEach((patient, index) => {
                patientsList.innerHTML += `
                    <div class="patient">
                        <p><strong>Nombre:</strong> ${patient.name}</p>
                        <p><strong>Edad:</strong> ${patient.age}</p>
                        <p><strong>Fecha de Nacimiento:</strong> ${patient.dob}</p>
                        <p><strong>Síntomas:</strong> ${patient.symptoms}</p>
                        <p><strong>Análisis:</strong> ${patient.analysis}</p>
                        <hr>
                    </div>`;
            });
        }
    }
});
