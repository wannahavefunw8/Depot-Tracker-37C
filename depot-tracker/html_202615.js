// Load and display depot data
async function loadDepots() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displayDepots(data.depots);
        updateTime();
    } catch (error) {
        console.error('Error loading depot data:', error);
        document.getElementById('depotList').innerHTML = 
            '<div class="depot-card">Error loading depot data</div>';
    }
}

// Display depots on page
function displayDepots(depots) {
    const depotList = document.getElementById('depotList');
    depotList.innerHTML = '';
    
    depots.forEach(depot => {
        const card = document.createElement('div');
        card.className = 'depot-card';
        
        // Determine status class
        const statusClass = depot.status.includes('ANOMALY') 
            ? 'status-anomaly' 
            : 'status-active';
        
        card.innerHTML = `
            <div class="depot-header">
                <div class="depot-name">${depot.name}</div>
                <div class="depot-status ${statusClass}">${depot.status}</div>
            </div>
            <div class="depot-info">
                <div class="info-row">
                    <span class="info-label">Coordinates:</span>
                    <span>${depot.coordinates}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Last Updated:</span>
                    <span>${depot.lastUpdated}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Assets:</span>
                    <span>${depot.assets}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Notes:</span>
                    <span>${depot.notes}</span>
                </div>
            </div>
        `;
        
        depotList.appendChild(card);
    });
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    document.getElementById('currentTime').textContent = timeString;
    
    // Update every second
    setTimeout(updateTime, 1000);
}

// Load depots when page loads
document.addEventListener('DOMContentLoaded', loadDepots);