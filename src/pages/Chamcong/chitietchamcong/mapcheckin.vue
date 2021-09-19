<template>
  <div class="dashboard-map-container" id="dashboard-map-container">
    <div class="dashboard-map" id="dashboard-map"></div>
  </div>
</template>

<script>
import "./L.Polyline.SnakeAnim";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconBuilding from "../../../assets/images/iconBuilding.png";
import iconUser from "../../../assets/images/iconUser.png";
export default {
  name: "tracking-map",
  data() {
    return {
      timeout: null,
      iconBuilding,
      iconUser,
      map: null,
      marker: null,
      markerChecking: null,
      markerCompany: null,
      search: null,
      layerGroup: [],
      polyline: [],
      router: null,
      dataAddresses: [],
      myIcon: null,
      poligon: null,
    };
  },
  watch: {
    search(val) {
      if (val != "" && val != null) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          document.getElementById("suggest").style.display = "table";
          document.getElementById("suggest").style.backgroundColor = "white";
          this.getLatLng(val);
        }, 500);
      } else {
        this.dataAddresses = [];
        document.getElementById("suggest").style.display = "none";
      }
    },
  },

  methods: {
    deleteMarker() {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
    },

    setMarker(viTri, checking) {
      this.$nextTick(() => {
        this.deleteMarker();
        var lat1 = viTri.lat;
        var lng1 = viTri.long;
        var lat2 = checking.lat;
        var lng2 = checking.long;
        this.setMarkerMap();
        var diaDiem = L.marker([lat1, lng1], { icon: this.markerCompany })
          .addTo(this.map)
          .bindPopup("Vị trí làm việc.");
        var M_checkking = L.marker([lat2, lng2], { icon: this.markerChecking })
          .addTo(this.map)
          .bindPopup("Vị trí chấm công.");
        var group = L.featureGroup([diaDiem, M_checkking]);
        this.map.fitBounds(group.getBounds());
        var pointA = new L.LatLng(lat1, lng1);
        var pointB = new L.LatLng(lat2, lng2);
        var pointList = [pointA, pointB];

        var firstpolyline = new L.Polyline(pointList, {
          color: "blue",
          weight: 3,
          opacity: 2,
          smoothFactor: 1,
        });
        firstpolyline.addTo(this.map);
      });
    },
    makeMarker(latlng) {
      this.marker = new L.Marker(latlng, {
        icon: this.myIcon,
        draggable: true,
      }).addTo(this.map);
    },
    getAddress(lat, lng) {
      this.$emit("get-address", {
        lat: lat,
        lng: lng,
      });
    },

    getMap(lat = 21.005796351058695, lng = 105.8465337753296) {
      this.map = L.map("dashboard-map").setView([lat, lng], 18);
      L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ["a", "b", "c"],
        maxZoom: 20,
      }).addTo(this.map);
      document
        .getElementsByClassName("leaflet-control-attribution")[0]
        .firstChild.remove();
      var a = document.createElement("a");
      a.href = "http://skymapglobal.vn/";
      a.text = "Skymap";
      document
        .getElementsByClassName("leaflet-control-attribution")[0]
        .append(a);
    },
    setMarkerMap() {
      this.markerCompany = L.icon({
        iconUrl: this.iconBuilding,
        iconSize: [35, 35],
      });
      this.markerChecking = L.icon({
        iconUrl: this.iconUser,
        iconSize: [35, 35],
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.getMap();
    });
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
.dashboard-map-container {
  min-width: 0;
  min-height: 0;
  flex: 1;
}

.dashboard-map {
  width: 100%;
  height: 280px;
}
#boxsearch {
  border: none;
  border-bottom: 2px solid #409eff;
  padding: 10px 5px;
  position: absolute;
  top: 390px;
  right: 50px;
  width: 350px;
  z-index: 1001;
  background: white;
}
#suggest {
  position: absolute;
  right: 50px;
  top: 260px;
  z-index: 99999999999;
  width: 400px;
}
#suggest ul {
  list-style: none;
  padding-left: 0px;
  margin-top: 0px;
}
#suggest ul li:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
.fa-search {
  position: absolute;
  right: 70px;
  z-index: 999999999999;
  top: 400px;
  color: #409eff;
  font-size: 18px;
}
@media (max-width: 990px) {
  #boxsearch {
    width: 300px;
  }
}
@media (max-width: 768px) {
  #boxsearch {
    width: 260px;
  }
}
@media (max-width: 576px) {
  #boxsearch {
    width: 160px;
  }
}
</style>
