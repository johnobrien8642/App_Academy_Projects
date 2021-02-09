import React from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import MarkerManager from '../../util/marker_manager';
import BenchForm from './bench_form';

const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
})


const mapOptions = {
  center: { lat: 37.7758, lng: -122.435 },
  zoom: 13
}

class BenchMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const { bench, benches, singleBench } = this.props;
  
    if (singleBench) {
        const centeredMap = {
          center: { lat: bench.lat, lng: bench.lng },
          zoom: 13,
          gestureHandling: 'none',
          zoomControl: false
        }

        this.map = new google.maps.Map(this.mapNode, centeredMap);
        this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
        this.MarkerManager.updateMarker(bench)
        localStorage.setItem('bench', JSON.stringify(bench))
    } else {
      this.map = new google.maps.Map(this.mapNode, mapOptions);
      this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this));
      this.registerListeners();
      this.MarkerManager.updateMarkers(benches);
    }
  }

  componentDidUpdate () {
    const { bench, singleBench, benches, fetchBench } = this.props;
    if (singleBench) {
      this.MarkerManager.updateMarker(bench)
    } else {
      this.MarkerManager.updateMarkers(benches);
    }  
  }

  registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west} = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west}
      };
      this.props.updateFilters('bounds', bounds)
    })

    google.maps.event.addListener(this.map, 'click', (event) => {
      const coords = getCoordsObj(event.latLng)
      this.handleClick(coords);
    })
  }

  handleClick (coords) {
    this.props.history.push({
      pathname: 'benches/new',
      search: `lat=${coords.lat}&lng=${coords.lng}`
    });
  }

  handleMarkerClick (bench) {
    this.props.history.push(`benches/${bench.id}`)
  }

  benchDetail () {
    const { bench } = this.props;
    
    return (
      <div>
        <ul>
          <li>Description: {bench.description}</li>
          <li>Seating: {bench.seating}</li>
          <li>Lat: {bench.lat}</li>
          <li>Lng: {bench.lng}</li>
        </ul>
        <div className='image-preview'>
          <img 
            height='100%'
            width='100%'
            object-fit='contain' 
            src={bench.picture_url} />
        </div>
      </div>
    )
  }

  render () {
    const { singleBench } = this.props;

    return (
      <div>
      <div id='map-container' ref={ map => this.mapNode = map }>
      </div>
        { singleBench ? this.benchDetail() : <div></div> }
      </div>
    )
  }
}

export default withRouter(BenchMap);