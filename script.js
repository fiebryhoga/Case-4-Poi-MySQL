$(document).ready(function () {
  var map = L.map("map").setView([-6.2088, 106.8456], 12);
  var newMarker = null; // Untuk menyimpan marker baru yang belum disimpan
  var poiData = []; // Array untuk menyimpan data POI dari server

  // Tambahkan layer peta OSM
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Tambahkan marker ke peta saat klik
  map.on("click", function (e) {
    // Hapus marker sebelumnya yang belum disimpan (jika ada)
    if (newMarker) {
      map.removeLayer(newMarker);
    }

    // Gambar marker baru
    newMarker = L.marker(e.latlng, { draggable: true }).addTo(map);

    // Tampilkan popup untuk mengisi informasi POI
    var popup = L.popup().setLatLng(e.latlng).setContent(`
            <div class="popup-content">
                <h4 class="mb-3">Tambah POI</h4>
                <form id="poiForm">
                    <div class="form-group">
                        <label for="nama">Nama:</label>
                        <input type="text" class="form-control" id="nama" name="nama" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Deskripsi:</label>
                        <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="category">Kategori:</label>
                        <input type="text" class="form-control" id="category" name="category" required>
                    </div>
                    <div class="form-group">
                        <label for="rating">Rating:</label>
                        <input type="number" class="form-control" id="rating" name="rating" min="0" max="5" step="0.1" required>
                    </div>
                    <div class="form-group">
                        <label for="contact">Kontak:</label>
                        <input type="text" class="form-control" id="contact" name="contact">
                    </div>
                    <div class="form-group text-center">
                        <button type="button" class="btn btn-danger mr-2" id="cancelBtn">Batal</button>
                        <button type="submit" class="btn btn-primary ml-2" id="saveBtn">Simpan</button>
                    </div>
                </form>
            </div>
        `);

    newMarker.bindPopup(popup).openPopup();
  });

  // Event delegation untuk tombol Batal
  $(document).on("click", "#cancelBtn", function () {
    map.removeLayer(newMarker);
  });

  // Tombol Simpan - Kirim data melalui AJAX
  $(document).on("submit", "#poiForm", function (e) {
    e.preventDefault();

    var formData = {
      latitude: newMarker.getLatLng().lat.toFixed(8),
      longitude: newMarker.getLatLng().lng.toFixed(8),
      nama: $("#nama").val(),
      description: $("#description").val(),
      category: $("#category").val(),
      rating: $("#rating").val(),
      contact: $("#contact").val(),
    };

    $.ajax({
      url: "create_poi.php",
      type: "POST",
      data: formData,
      success: function (response) {
        console.log(response);
        map.removeLayer(newMarker);
        loadPOI(); // Muat kembali data POI setelah menambahkan baru
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  });

  // Fungsi untuk membuat string SVG bintang sesuai dengan rating
  function getRatingStars(rating) {
    var stars = "";
    var yellowStars = Math.floor(rating); // Jumlah bintang kuning
    var greyStars = 5 - yellowStars; // Jumlah bintang abu-abu

    // Tambahkan bintang kuning
    for (var i = 0; i < yellowStars; i++) {
      stars +=
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='gold'>" +
        "<path d='M12 2l3.09 6.26h6.31l-4.82 4.73 1.14 6.65L12 17.27l-5.72 3.37 1.14-6.65L2.6 8.26H8.9L12 2z'/>" +
        "</svg>";
    }

    // Tambahkan bintang abu-abu
    for (var j = 0; j < greyStars; j++) {
      stars +=
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='grey'>" +
        "<path d='M12 2l3.09 6.26h6.31l-4.82 4.73 1.14 6.65L12 17.27l-5.72 3.37 1.14-6.65L2.6 8.26H8.9L12 2z'/>" +
        "</svg>";
    }

    return stars;
  }

  // Fungsi untuk menampilkan popup saat hover pada marker
  function showPopupOnHover(marker, popupContent) {
    marker.on("mouseover", function (e) {
      this.openPopup();
    });

    marker.on("mouseout", function (e) {
      this.closePopup();
    });
  }

  

  // Fungsi untuk memuat data POI dari server
  function loadPOI() {
    $.ajax({
      url: "read_poi.php",
      type: "GET",
      dataType: "json",
      success: function (data) {
        poiData = data; // Simpan data POI ke dalam array poiData
        console.log(poiData); // Tampilkan array poiData di konsol
        // Hapus semua marker sebelum menambahkan marker baru
        map.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
        // Loop melalui data POI dan tambahkan marker ke peta

        // Loop melalui data POI dan tambahkan marker ke peta
        $.each(poiData, function (index, poi) {
          var marker = L.marker([poi.latitude, poi.longitude]).addTo(map);

          // Tampilkan pop up informasi dengan bintang sesuai rating
          var popupContent =
            "<b>" +
            poi.nama +
            "</b><br>" +
            "Description: " +
            poi.description +
            "<br>" +
            "Rating: " +
            getRatingStars(poi.rating);
          marker.bindPopup(popupContent);

          // Tampilkan popup saat hover pada marker
          showPopupOnHover(marker, popupContent);







          
          // Tambahkan event listener untuk klik kanan pada marker POI
          marker.on("contextmenu", function (e) {
            e.originalEvent.preventDefault(); // Mencegah konteks menu bawaan muncul

            // Buat elemen pop up konfirmasi dengan tombol
            var popupConfirmation = document.createElement("div");
            popupConfirmation.classList.add("popup-confirmation");
            popupConfirmation.innerHTML = `
        <div class="popup-content">
            <p>Apakah Anda yakin ingin menghapus POI ini?</p>
            <button id="confirmDelete">Ya, hapus</button>
            <button id="cancelDelete">Batal</button>
        </div>
    `;

            // Tambahkan pop up ke dalam body dokumen
            document.body.appendChild(popupConfirmation);

            // Event listener untuk tombol "Batal"
            document
              .getElementById("cancelDelete")
              .addEventListener("click", function () {
                document.body.removeChild(popupConfirmation); // Tutup pop up
              });

            // Event listener untuk tombol "Ya, hapus"
            document
              .getElementById("confirmDelete")
              .addEventListener("click", function () {
                document.body.removeChild(popupConfirmation); // Tutup pop up

                // Kirim permintaan hapus ke server
                $.ajax({
                  url: "delete_poi.php",
                  type: "POST",
                  data: { id: poi.id }, // Kirim ID POI ke server
                  success: function (response) {
                    console.log(response);
                    if (response === "success") {
                      map.removeLayer(marker); // Hapus marker dari peta setelah berhasil dihapus dari database
                      console.log("Delete berhasil.");
                    } else {
                      console.log("Delete gagal: " + response);
                    }
                  },
                  error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.log("Delete gagal: " + xhr.responseText);
                  },
                });
              });
          });
        });
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  // Panggil fungsi loadPOI saat halaman dimuat
  loadPOI();
});
