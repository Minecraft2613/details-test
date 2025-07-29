document.addEventListener('DOMContentLoaded', () => {
    const editionSelect = document.getElementById('edition');
    const bedrockNameField = document.getElementById('bedrock-name-field');
    const javaNameField = document.getElementById('java-name-field');
    const voteSection = document.getElementById('vote-section');
    const partyListSection = document.getElementById('party-list-section');
    const registerCandidateForm = document.getElementById('register-candidate-form');
    const liveVoteCountDiv = document.getElementById('live-vote-count');
    const partyListDiv = document.getElementById('party-list');
    const nextBtn = document.getElementById('next-btn');
    const candidateManagementSection = document.getElementById('candidate-management-section');
    const candidateDashboard = document.getElementById('candidate-dashboard');
    const logoPreview = document.getElementById('logo-preview');
    const uploadLogoBtn = document.getElementById('upload-logo-btn');
    const partyLogoUpload = document.getElementById('party-logo-upload');

    const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAaElEQVR42u3PQREAAAgDoC2G/Yt62e20IIDz9wYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMDbA3cAAR2gLdJPAAAAAElFTkSuQmCC';

    let candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    let votes = JSON.parse(localStorage.getItem('votes')) || [];
    let playerData = {};
    let loggedInCandidate = null;

    function toggleEditionFields() {
        if (editionSelect.value === 'bedrock') {
            bedrockNameField.style.display = 'block';
            javaNameField.style.display = 'none';
        } else {
            bedrockNameField.style.display = 'none';
            javaNameField.style.display = 'block';
        }
    }

    function updateLiveVoteCount() {
        liveVoteCountDiv.innerHTML = '';
        const voteCounts = {};

        votes.forEach(vote => {
            voteCounts[vote.party] = (voteCounts[vote.party] || 0) + 1;
        });

        const sortedVoteCounts = Object.entries(voteCounts).sort(([, countA], [, countB]) => countB - countA);

        if (sortedVoteCounts.length > 0) {
            sortedVoteCounts.forEach(([party, count]) => {
                const partyData = candidates.find(c => c.partyName === party);
                const div = document.createElement('div');
                div.classList.add('vote-count-item');

                if (partyData && partyData.partyLogo) {
                    const logo = document.createElement('img');
                    logo.src = partyData.partyLogo;
                    logo.alt = partyData.partyName;
                    logo.classList.add('party-logo-small');
                    div.appendChild(logo);
                }

                const text = document.createElement('span');
                text.textContent = `${party}: ${count} votes`;
                div.appendChild(text);

                liveVoteCountDiv.appendChild(div);
            });
        } else {
            liveVoteCountDiv.textContent = 'No votes cast yet.';
        }
    }

    function displayPartyList() {
        partyListDiv.innerHTML = '';
        candidates.forEach(candidate => {
            const partyCard = document.createElement('div');
            partyCard.classList.add('party-card');

            const partyLogo = document.createElement('img');
            partyLogo.src = candidate.partyLogo || placeholderImage;
            partyLogo.alt = candidate.partyName;

            const partyName = document.createElement('h3');
            partyName.textContent = candidate.partyName;

            const partyLeader = document.createElement('p');
            partyLeader.textContent = `Leader: ${candidate.candidateName}`;

            const partyChinn = document.createElement('p');
            partyChinn.textContent = `Chinn: ${candidate.partyChinn}`;

            const voteButton = document.createElement('button');
            voteButton.textContent = 'Vote for this Party';
            voteButton.addEventListener('click', () => {
                votes.push({ ...playerData, party: candidate.partyName });
                localStorage.setItem('votes', JSON.stringify(votes));
                alert(`You have successfully voted for ${candidate.partyName}!`);
                voteSection.style.display = 'block';
                partyListSection.style.display = 'none';
                updateLiveVoteCount();
            });

            partyCard.appendChild(partyLogo);
            partyCard.appendChild(partyName);
            partyCard.appendChild(partyLeader);
            partyCard.appendChild(partyChinn);
            partyCard.appendChild(voteButton);
            partyListDiv.appendChild(partyCard);
        });
    }

    function displayCandidateDashboard() {
        if (loggedInCandidate) {
            candidateManagementSection.style.display = 'block';
            candidateDashboard.innerHTML = `
                <h3>Welcome, ${loggedInCandidate.candidateName}!</h3>
                <p>Party: ${loggedInCandidate.partyName}</p>
                <p>Chinn: ${loggedInCandidate.partyChinn}</p>
                <img src="${loggedInCandidate.partyLogo}" alt="${loggedInCandidate.partyName}" class="party-logo-large">
            `;
        } else {
            candidateManagementSection.style.display = 'none';
        }
    }

    function loginAsCandidate(candidateName) {
        loggedInCandidate = candidates.find(c => c.candidateName === candidateName);
        displayCandidateDashboard();
    }

    // Initial setup
    toggleEditionFields();
    updateLiveVoteCount();

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            const currentSection = e.currentTarget.parentElement;

            // Close other sections
            sectionHeaders.forEach(otherHeader => {
                const otherSection = otherHeader.parentElement;
                if (otherSection !== currentSection && otherSection.classList.contains('active')) {
                    otherSection.classList.remove('active');
                    otherHeader.nextElementSibling.classList.add('collapsed');
                }
            });

            // Toggle current section
            currentSection.classList.toggle('active');
            e.currentTarget.nextElementSibling.classList.toggle('collapsed');
        });
    });

    document.getElementById('vote-section').classList.add('active');
    document.getElementById('vote-section').querySelector('.section-content').classList.remove('collapsed');

    editionSelect.addEventListener('change', toggleEditionFields);

    nextBtn.addEventListener('click', () => {
        const edition = editionSelect.value;
        let minecraftNameInput;
        if (edition === 'bedrock') {
            minecraftNameInput = document.getElementById('bedrock-name');
        } else {
            minecraftNameInput = document.getElementById('java-name');
        }

        if (!minecraftNameInput.value.trim()) {
            alert('Please enter your Minecraft Name.');
            minecraftNameInput.focus();
            return;
        }

        playerData = {
            edition,
            minecraftName: minecraftNameInput.value,
            realName: document.getElementById('real-name').value,
            discordInsta: document.getElementById('discord-insta').value
        };

        voteSection.style.display = 'none';
        partyListSection.style.display = 'block';
        displayPartyList();
    });

    uploadLogoBtn.addEventListener('click', () => {
        partyLogoUpload.click();
    });

    partyLogoUpload.addEventListener('change', () => {
        const file = partyLogoUpload.files[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) { // 1MB size limit
                alert('Image size should be less than 1MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                logoPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    registerCandidateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const candidateName = document.getElementById('candidate-name').value;
        const partyName = document.getElementById('party-name').value;
        const partyChinn = document.getElementById('party-chinn').value;

        const newCandidate = {
            candidateName,
            partyName,
            partyChinn,
            partyLogo: logoPreview.src
        };

        try {
            candidates.push(newCandidate);
            localStorage.setItem('candidates', JSON.stringify(candidates));
            alert('Candidate registered successfully!');
            registerCandidateForm.reset();
            logoPreview.src = placeholderImage;
            loginAsCandidate(candidateName);
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                alert('Could not save candidate data. The local storage is full. Please clear some space or use a smaller logo.');
                candidates.pop(); // Remove the failed candidate entry
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    });
});