<template>
  <div class="dashboard-map-container" id="dashboard-map-container">
    <input
      type="text"
      id="boxsearch"
      v-model="search"
      placeholder="Nhập địa chỉ cần tìm kiếm...."
    />
    <i class="fa fa-search"></i>
    <div id="suggest" style="display: none">
      <ul>
        <!-- <li
          style="padding:12px 0px 12px 10px"
          v-for="(item,index) in dataAddresses"
          @click="setMarker(item)"
        >
          <i class="fa fa-map-marker"></i>
          <a style="margin-left:5px">{{item.full_name}}</a>
        </li> -->
      </ul>
    </div>
    <div class="dashboard-map" id="dashboard-map"></div>
  </div>
</template>

<script>
import "./L.Polyline.SnakeAnim";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  name: "tracking-map",
  data() {
    return {
      timeout: null,
      map: null,
      marker: null,
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

    setMarker(item) {
      this.$nextTick(() => {
      document.getElementById("suggest").style.display = "none";
      this.deleteMarker();
      var lat = item.lat;
      var lng = item.long;
      this.makeMarker([lat, lng]);
      this.map.setView([lat, lng], 15);
      this.search = null;
      this.dataAddresses = [];
      })
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
      var controler = this;
      this.map = L.map("dashboard-map").setView([lat, lng], 18);
      L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ["a", "b", "c"],
        maxZoom: 20,
      }).addTo(this.map);

      this.myIcon = L.icon({
        iconUrl:
          "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        iconSize: [35, 35],
      });
      this.marker = new L.Marker([lat, lng], {
        icon: this.myIcon,
        draggable: true,
      });
      this.marker
        .bindPopup("<strong>" + [lat, lng] + "</strong>")
        .addTo(this.map);

      this.map.on("click", (e) => {
        this.deleteMarker();
        this.marker = new L.Marker(e.latlng, {
          icon: this.myIcon,
          draggable: true,
        });
        var latlon = this.marker.getLatLng();
        controler.getAddress(latlon.lat, latlon.lng);
        this.marker
          .bindPopup("<strong>" + e.latlng + "</strong>")
          .addTo(this.map);
        this.marker.on("dragend", function () {
          latlon = this.getLatLng();
          controler.getAddress(latlon.lat, latlon.lng);
        });
      });
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
  },

  mounted() {
    this.$nextTick(() => {
    this.getMap();
    })
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
  height: 350px;
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
