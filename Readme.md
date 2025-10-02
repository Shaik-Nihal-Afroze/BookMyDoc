 # BookMyDoc 🩺

BookMyDoc is a **FullStack MERN Application** that allows patients to book doctor appointments, and doctors to manage those appointments. The app also provides a **real-time chat system** between patients and doctors once an appointment is confirmed.

---

## 🚀 Features
- 👨‍⚕️ Patient registration & login
- 👩‍⚕️ Doctor registration & login
- 📅 Appointment booking & management
- ✅ Doctors can accept/reject appointments
- 💬 Real-time chat (via WebSockets) between patients & doctors
- 🔐 Authentication & Authorization (JWT-based)
- 📊 User-friendly dashboard

---

## 🛠️ Tech Stack
**Frontend:** React.js, Redux, CSS3, HTML5  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT  
**Real-time Communication:** WebSockets (Socket.IO)  

---

## ⚙️ Installation

### 1. Clone the repository

git clone https://github.com/Shaik-Nihal-Afroze/BookMyDoc.git
cd BookMyDoc


2. Install dependencies

For both client and server folders:

cd client
npm install

cd ../server
npm install

3. Setup Environment Variables

Create a .env file inside the server folder and add your environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


⚠️ Note: Do NOT commit .env to GitHub. Keep it private!

4. Run the project

Start backend:

cd server
npm start


Start frontend:

cd client
npm start

🔑 Demo Credentials

👨‍⚕️ Doctors
      _____________________________________________
      |Name       | Email             | Password   |
      _____________________________________________
      Naveen      | naveen@gmail.com  | naveen@007
      _____________________________________________
      Hussain     | hussain@gmail.com | hussain@007
      _____________________________________________
      Rajesh Nair | rajesh@gmail.com  | rajesh@007
      _____________________________________________

🧑‍🦱 Patients
      _____________________________________________
      |Name       | Email             | Password  |
      _____________________________________________
      Nihal      | nihal@gmail.com  | nihal@007
      _____________________________________________
      Arun Kumar     | arunkumar@gmail.com | arun@007@007
      _____________________________________________
      Anas | anas@gmail.com  | anas@007
      _____________________________________________



📸 Screenshots


  LoginPage (https://res.cloudinary.com/dze7v0evj/image/upload/v1759402263/Screenshot_2025-10-02_161956_mrtcts.png)
  SignUp (https://res.cloudinary.com/dze7v0evj/image/upload/v1759402263/Screenshot_2025-10-02_162014_upm87f.png)

 Patient -

  PatientHomePage - (https://res.cloudinary.com/dze7v0evj/image/upload/v1759401309/patient-homePage.png)
  DoctorDetailsPage - (https://res.cloudinary.com/dze7v0evj/image/upload/v1759401357/DoctotDetailspage.png)
  PatientAppointmentPage - (https://res.cloudinary.com/dze7v0evj/image/upload/v1759401358/Patient-appointment-images.png)


Doctor -
  DoctorPage - (https://res.cloudinary.com/dze7v0evj/image/upload/v1759402690/Screenshot_2025-10-02_162711_rrspsy.png)

Chat - (https://res.cloudinary.com/dze7v0evj/image/upload/v1759402690/Screenshot_2025-10-02_162711_rrspsy.png)


