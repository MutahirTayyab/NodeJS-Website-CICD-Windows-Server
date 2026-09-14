# 🚀 Node.js Website CI/CD Deployment on Windows Server

<p align="center">
  <strong>A complete DevOps deployment workflow for a Node.js Express portfolio application using GitHub, Jenkins, PM2, and Microsoft IIS.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?logo=jenkins&logoColor=white" alt="Jenkins">
  <img src="https://img.shields.io/badge/PM2-Process%20Manager-2B037A" alt="PM2">
  <img src="https://img.shields.io/badge/Microsoft-IIS-0078D4?logo=microsoft&logoColor=white" alt="Microsoft IIS">
  <img src="https://img.shields.io/badge/GitHub-Source%20Control-181717?logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/Windows-Server-0078D6?logo=windows&logoColor=white" alt="Windows Server">
</p>

---

## 📌 Project Overview

This project demonstrates a **production-style DevOps deployment workflow** for a Node.js Express portfolio website hosted on a Windows Server environment.

The application is developed locally, stored in GitHub, deployed through a Jenkins CI/CD pipeline, managed by PM2, and exposed to users through Microsoft IIS acting as a reverse proxy.

The primary goal is to automate the deployment process so that application updates can move from source control to the hosted environment in a repeatable and controlled way.

---

## 🎯 Project Objectives

The project was built to demonstrate an end-to-end DevOps workflow covering:

- Local Node.js application development
- Git-based version control
- GitHub repository management
- Jenkins CI/CD automation
- Automated dependency installation
- Controlled deployment to an IIS-hosted directory
- PM2-based Node.js process management
- IIS reverse proxy configuration using URL Rewrite and ARR
- Troubleshooting of common Windows, Jenkins, npm, IIS, and PM2 issues

---

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Frontend | HTML, CSS, JavaScript |
| Package Manager | npm |
| Source Control | Git + GitHub |
| CI/CD | Jenkins |
| Web Server | Microsoft IIS |
| Reverse Proxy | IIS URL Rewrite + Application Request Routing (ARR) |
| Process Manager | PM2 |
| Operating System | Windows / Windows Server |
| Shell | PowerShell / Command Prompt |

> The repository also contains a `Dockerfile` and `.dockerignore`, but the documented production deployment flow for this project uses **Jenkins + PM2 + IIS on Windows Server**.

---

## 🏗️ Production Architecture

```text
Developer
   |
   |  git commit / git push
   v
GitHub Repository
   |
   v
Jenkins Pipeline
   |
   +------------------------------+
   |                              |
   v                              v
Checkout Latest Code        Install Dependencies
                                   |
                                   v
                              npm install
                                   |
                                   v
                         Deploy Application Files
                                   |
                                   v
                          Restart PM2 Process
                                   |
                                   v
                         Node.js Express App :3000
                                   |
                                   v
                     IIS URL Rewrite + ARR Proxy
                                   |
                                   v
                            IIS :80 / :443
                                   |
                                   v
                            End User Browser
```

---

## 🔄 CI/CD Workflow

The automated deployment workflow follows this sequence:

```text
Developer modifies code
        ↓
git add .
        ↓
git commit
        ↓
git push
        ↓
GitHub stores latest source
        ↓
Jenkins checks out latest code
        ↓
npm install
        ↓
Jenkins copies deployment files
        ↓
PM2 restarts the Node.js application
        ↓
IIS reverse proxy serves the updated website
```

This removes the need to manually pull code, reinstall dependencies, copy files, and restart the application after each change.

---

## 📁 Repository Structure

```text
NodeJS-Website-CICD-Windows-Server/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── Jenkinsfile
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

### Important Files

| File | Purpose |
|---|---|
| `server.js` | Starts the Express application |
| `package.json` | Defines project metadata, dependencies, and npm scripts |
| `public/` | Contains frontend HTML, CSS, and JavaScript |
| `Jenkinsfile` | Defines the automated CI/CD pipeline |
| `.gitignore` | Prevents unwanted or sensitive files from being committed |
| `Dockerfile` | Container build definition included in the repository |
| `.dockerignore` | Excludes unnecessary files from Docker build context |

---

## 💻 Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/MutahirTayyab/NodeJS-Website-CICD-Windows-Server.git
cd NodeJS-Website-CICD-Windows-Server
```

### 2. Verify Node.js and npm

```bash
node -v
npm -v
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

The application should become available at:

```text
http://localhost:3000
```

The expected npm start script is:

```json
"scripts": {
  "start": "node server.js"
}
```

---

## 🌐 Windows IIS Deployment

The Node.js application listens on port `3000`, while IIS handles incoming client requests on the standard web ports.

### Request Flow

```text
Browser
   ↓
IIS :80 / :443
   ↓
URL Rewrite
   ↓
Application Request Routing (ARR)
   ↓
http://localhost:3000
   ↓
Node.js Express Application
```

### Required IIS Components

- Microsoft IIS
- IIS URL Rewrite Module
- Application Request Routing (ARR)
- Reverse proxy enabled in ARR

### Example IIS Rewrite Target

```text
http://localhost:3000/{R:1}
```

A request such as:

```text
https://example.com/about
```

is forwarded internally to:

```text
http://localhost:3000/about
```

---

## ⚙️ PM2 Process Management

PM2 keeps the Node.js application running in the background and provides process monitoring and restart capabilities.

### Install PM2

```bash
npm install pm2 -g
```

### Start the application

```bash
pm2 start server.js --name mutahir-portfolio
```

### Check status

```bash
pm2 list
```

### Save the process configuration

```bash
pm2 save
```

### Restart after deployment

```bash
pm2 restart mutahir-portfolio
```

---

## 🔧 Jenkins CI/CD Pipeline

The Jenkins pipeline automates four main deployment stages:

1. **Checkout Code** — retrieves the latest source code from GitHub.
2. **Install Dependencies** — runs `npm install`.
3. **Deploy Files** — copies the application from the Jenkins workspace to the IIS deployment directory.
4. **Restart Application** — restarts the PM2-managed Node.js process.

### Pipeline Flow

```text
GitHub
   ↓
Jenkins Checkout
   ↓
npm install
   ↓
Copy Deployment Files
   ↓
IIS Deployment Directory
   ↓
PM2 Restart
   ↓
Updated Application
```

### Jenkins Requirements

The documented setup uses:

- Git Plugin
- Pipeline Plugin
- GitHub Integration Plugin
- NodeJS Plugin

Node.js is configured in Jenkins under:

```text
Manage Jenkins
  → Tools
  → NodeJS installations
```

The documented Jenkins Node.js installation name is:

```text
NodeJS-24
```

---

## 📦 Deployment Directory Separation

The development directory and IIS deployment directory are intentionally kept separate.

```text
Development Source
      ↓
GitHub
      ↓
Jenkins Workspace
      ↓
Deployment Copy
      ↓
IIS Hosting Directory
```

This separation helps prevent accidental development changes from directly affecting the deployed application.

---

## 🧪 Testing the CI/CD Pipeline

A typical deployment test is:

```bash
git status
git add .
git commit -m "Update website design"
git push
```

Jenkins then performs:

```text
Checkout
   ↓
Install Dependencies
   ↓
Deploy Files
   ↓
Restart PM2
   ↓
SUCCESS
```

Once the pipeline completes, IIS serves the updated version of the application.

---

## 🛠️ Troubleshooting

### 1. `node` command not recognized

Verify Node.js:

```bash
node -v
```

If the command is unavailable, install Node.js and ensure it is added to the Windows `PATH`.

---

### 2. PowerShell blocks `npm.ps1`

Example error:

```text
npm.ps1 cannot be loaded because running scripts is disabled on this system
```

Run PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Verify:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
```

Expected:

```text
RemoteSigned
```

---

### 3. PM2 is not recognized inside Jenkins

Jenkins may not automatically detect globally installed npm packages.

The documented solution is to add the PM2 npm path before running PM2:

```bat
set PATH=%PATH%;C:\Users\Mutahir Tayyab\AppData\Roaming\npm
pm2 restart mutahir-portfolio
```

> For another machine or Jenkins service account, update this path to match that environment.

---

### 4. PM2 process not found

Example:

```text
[PM2][ERROR] Process or Namespace mutahir-portfolio not found
```

Start the application first:

```bash
pm2 start server.js --name mutahir-portfolio
pm2 list
```

---

### 5. Jenkins succeeds but the website does not update

A common cause is that Jenkins has the latest code in its workspace, while IIS is still serving older deployment files.

Correct flow:

```text
GitHub
   ↓
Jenkins Workspace
   ↓
Copy Files
   ↓
IIS Deployment Directory
   ↓
PM2 Restart
   ↓
Updated Website
```

The deployment stage must therefore copy the updated application into the IIS deployment directory before restarting PM2.

---

## 🔐 Git & Repository Hygiene

The `.gitignore` should exclude generated and sensitive content such as:

```gitignore
node_modules/
.env
logs/
*.log
```

Do not commit:

- Environment files containing secrets
- Passwords
- API keys
- Private certificates or keys
- Machine-specific credentials

---

## ✅ Key Outcomes

This project demonstrates practical experience with:

- Node.js application deployment
- Git and GitHub version control
- Jenkins pipeline creation
- CI/CD workflow automation
- Windows Server administration
- Microsoft IIS hosting
- Reverse proxy configuration
- PM2 process management
- Automated application deployment
- Windows and Jenkins troubleshooting

---

## 🚀 Future Improvements

Potential improvements for the project include:

- Trigger Jenkins automatically using GitHub webhooks
- Add automated tests before deployment
- Introduce separate development, staging, and production environments
- Add rollback functionality
- Add deployment health checks
- Add centralized logging and monitoring
- Add HTTPS certificate automation
- Extend the containerized deployment path already represented by the repository's `Dockerfile`

---

## 👨‍💻 Author

**Mutahir Tayyab**  
Associate DevOps Engineer

- GitHub: [@MutahirTayyab](https://github.com/MutahirTayyab)
- LinkedIn: [mutahir-tayyab](https://www.linkedin.com/in/mutahir-tayyab-575b86283/)
---

<p align="center">
  <strong>Built to demonstrate an end-to-end CI/CD deployment workflow on Windows Server.</strong>
</p>
