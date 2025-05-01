document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            // Initialize map when route-map tab is selected
            if (tabId === 'route-map' && !window.mapInitialized) {
                initTransportMap();
                window.mapInitialized = true;
            }
        });
    });

    // Route filter functionality
    document.getElementById('route-select').addEventListener('change', function() {
        filterSchedules();
    });

    document.getElementById('day-select').addEventListener('change', function() {
        filterSchedules();
    });

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });

    function filterSchedules() {
        const routeValue = document.getElementById('route-select').value;
        const dayValue = document.getElementById('day-select').value;
        
        document.querySelectorAll('.schedule-table').forEach(table => {
            if (routeValue === 'all' || table.querySelector('h3').textContent.includes(routeValue.split(':')[0])) {
                table.style.display = 'block';
            } else {
                table.style.display = 'none';
            }
        });
    }

    function initTransportMap() {
        // Initialize map centered on DIU
        const map = L.map('transport-map').setView([23.777176, 90.399452], 12);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // DIU marker
        L.marker([23.777176, 90.399452]).addTo(map)
            .bindPopup('<b>Daffodil International University</b><br>Main Campus')
            .openPopup();
        
        // Route 1: Mirpur - DIU
        const route1 = L.polyline([
            [23.8316, 90.3652], // Mirpur 10
            [23.8245, 90.3689], // Mirpur 14
            [23.8044, 90.3687], // Kallyanpur
            [23.777176, 90.399452] // DIU
        ], {color: '#3b82f6', weight: 5}).addTo(map);
        
        // Route 2: Dhanmondi - DIU
        const route2 = L.polyline([
            [23.7465, 90.3760], // Dhanmondi 27
            [23.7452, 90.3705], // Dhanmondi 15
            [23.7598, 90.3842], // Shankar
            [23.777176, 90.399452] // DIU
        ], {color: '#ef4444', weight: 5}).addTo(map);
        
        // Route 3: Uttara - DIU
        const route3 = L.polyline([
            [23.8709, 90.3918], // Uttara
            [23.8512, 90.3945], // Airport
            [23.8135, 90.4236], // Mohakhali
            [23.777176, 90.399452] // DIU
        ], {color: '#10b981', weight: 5}).addTo(map);
        
        // Route 4: Mohammadpur - DIU
        const route4 = L.polyline([
            [23.7647, 90.3592], // Mohammadpur
            [23.7598, 90.3842], // Shankar
            [23.777176, 90.399452] // DIU
        ], {color: '#f59e0b', weight: 5}).addTo(map);
        
        // Add markers for stops
        const stops = [
            {name: "Mirpur 10", coords: [23.8316, 90.3652]},
            {name: "Mirpur 14", coords: [23.8245, 90.3689]},
            {name: "Kallyanpur", coords: [23.8044, 90.3687]},
            {name: "Dhanmondi 27", coords: [23.7465, 90.3760]},
            {name: "Dhanmondi 15", coords: [23.7452, 90.3705]},
            {name: "Shankar", coords: [23.7598, 90.3842]},
            {name: "Uttara", coords: [23.8709, 90.3918]},
            {name: "Airport", coords: [23.8512, 90.3945]},
            {name: "Mohakhali", coords: [23.8135, 90.4236]},
            {name: "Mohammadpur", coords: [23.7647, 90.3592]}
        ];
        
        stops.forEach(stop => {
            L.marker(stop.coords).addTo(map)
                .bindPopup(`<b>${stop.name}</b><br>Bus Stop`);
        });
        
        // Fit bounds to show all routes
        map.fitBounds([
            [23.8709, 90.3592], // North-West (Uttara)
            [23.7452, 90.4236]  // South-East (Mohakhali)
        ]);
    }
});