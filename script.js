$(document).ready(function () {
  // Inisialisasi peta Leaflet
  var map = L.map("map").setView([-6.2088, 106.8456], 12);
  var newMarker = null; // Untuk menyimpan marker baru yang belum disimpan

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

        loadPOI();
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
        // Loop melalui data POI dan tambahkan marker ke peta
        $.each(data, function (index, poi) {
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
        });
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });
  }

  // Panggil fungsi loadPOI saat halaman dimuat
  loadPOI();

  /// Menyembunyikan modal saat dokumen dimuat
  window.onload = function () {
    document.getElementById("confirmModal").style.display = "none";
  };

  // Add contextmenu event listener to the marker
  marker.on("contextmenu", function () {
    // Tampilkan modal konfirmasi
    document.getElementById("confirmModal").style.display = "block";

    // Jika pengguna mengklik 'Ya', hapus marker
    document.getElementById("confirmButton").onclick = function () {
      // Mengirim data menggunakan Fetch API
      fetch("delete.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${place.id}`,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Respon jaringan buruk");
          }
          return response.text();
        })
        .then((data) => {
          console.log(data);
          map.removeLayer(marker);
        })
        .catch((error) => {
          console.error("Ada masalah dengan fetch :", error);
        });

      // Sembunyikan modal
      document.getElementById("confirmModal").style.display = "none";
    };

    // Jika pengguna mengklik 'Tidak', sembunyikan modal
    document.getElementById("cancelButton").onclick = function () {
      document.getElementById("confirmModal").style.display = "none";
    };
  });
});