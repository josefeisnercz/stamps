document.addEventListener("DOMContentLoaded", function() {
    const folders = ['afghanes_pakistan_azerbaidjan_burma_bahrain_nippon', 'argentina_brasil.correio', 'australia']; // Add your folder names here	
    const folderList = document.getElementById('folder-list');
    const imageContainer = document.getElementById('image-container');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementsByClassName('close')[0];

    folders.forEach(folder => {
        const li = document.createElement('li');
        li.textContent = folder;
        li.addEventListener('click', () => loadImages(folder));
        folderList.appendChild(li);
    });

    function loadImages(folder) {
        imageContainer.innerHTML = '';
        fetch(`./${folder}/index.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(images => {
                if (images.length === 0) {
                    console.log(`No images found in folder: ${folder}`);
                }
                images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = `./${folder}/${image}`;
                    img.alt = image;
                    img.addEventListener('click', () => openModal(img.src));
                    imageContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error loading images:', error));
    }

    function openModal(src) {
        modal.style.display = 'block';
        modalImg.src = src;
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});