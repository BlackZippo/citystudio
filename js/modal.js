document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal script loaded'); // Debug log

    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-close">&times;</div>
        <img src="" alt="Enlarged Floor Plan">
    `;
    document.body.appendChild(modal);

    // Get the floor plan image
    const floorPlan = document.querySelector('.plan-image img');
    console.log('Floor plan element:', floorPlan); // Debug log
    console.log('Floor plan src:', floorPlan ? floorPlan.src : 'not found'); // Debug log

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal-close');

    if (floorPlan) {
        // Open modal on image click
        floorPlan.addEventListener('click', function(e) {
            console.log('Image clicked'); // Debug log
            const imageSrc = this.getAttribute('src'); // Use getAttribute instead of src property
            console.log('Setting modal image src to:', imageSrc); // Debug log
            
            // Get click position relative to viewport
            const rect = this.getBoundingClientRect();
            const clickY = e.clientY;
            const viewportHeight = window.innerHeight;
            
            // Calculate initial scroll position for modal
            const scrollOffset = window.pageYOffset;
            modal.style.top = scrollOffset + 'px';
            
            // Position image near click point but ensure it's visible
            const imageTop = Math.max(60, Math.min(clickY - 100, viewportHeight - 200));
            modalImg.style.marginTop = imageTop + 'px';
            
            modalImg.src = imageSrc;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            console.log('Modal shown'); // Debug log
        });

        // Also add click handler to container
        const planImageContainer = document.querySelector('.plan-image');
        if (planImageContainer) {
            planImageContainer.style.cursor = 'pointer';
            planImageContainer.addEventListener('click', function(e) {
                console.log('Container clicked'); // Debug log
                const imageSrc = floorPlan.getAttribute('src'); // Use getAttribute instead of src property
                console.log('Container click - setting modal image src to:', imageSrc); // Debug log
                
                // Get click position relative to viewport
                const rect = floorPlan.getBoundingClientRect();
                const clickY = e.clientY;
                const viewportHeight = window.innerHeight;
                
                // Calculate initial scroll position for modal
                const scrollOffset = window.pageYOffset;
                modal.style.top = scrollOffset + 'px';
                
                // Position image near click point but ensure it's visible
                const imageTop = Math.max(60, Math.min(clickY - 100, viewportHeight - 200));
                modalImg.style.marginTop = imageTop + 'px';
                
                modalImg.src = imageSrc;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                console.log('Modal shown from container click'); // Debug log
            });
        }
    }

    // Close modal functions
    function closeModal() {
        console.log('Closing modal'); // Debug log
        modal.classList.remove('show');
        document.body.style.overflow = '';
        // Reset modal positioning
        modal.style.top = '';
        modalImg.style.marginTop = '';
    }

    // Close on button click
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });

    // Close on modal background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevent image click from closing modal
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Add error handling for image load
    modalImg.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        this.style.display = 'none'; // Hide broken image icon
    });

    modalImg.addEventListener('load', function() {
        console.log('Image loaded successfully:', this.src);
        this.style.display = 'block';
    });
}); 