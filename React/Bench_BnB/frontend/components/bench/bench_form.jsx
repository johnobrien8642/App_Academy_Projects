import React from 'react'

export default class BenchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      description: '',
      seating: '2',
      imageUrl: '',
      imageFile: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToSearch = this.navigateToSearch.bind(this);
    this.previewImage = this.previewImage.bind(this);
  }

  update (field) {
    return e => this.setState({ [field]: e.target.value })
  }

  navigateToSearch () {
    this.props.history.push('/');
  }

  previewImage (e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0]
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file })

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageUrl: '', imageFile: null})
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bench[description]', this.state.description);
    formData.append('bench[seating]', this.state.seating);
    // add our coordinates
    formData.append('bench[lat]', this.state.lat);
    formData.append('bench[lng]', this.state.lng);

    if (this.state.imageFile) {
      formData.append('bench[photo]', this.state.imageFile);
    }
    
    this.props.createBench(formData)
    this.navigateToSearch();
  }
  
  render () {
    const preview = this.state.imageUrl ? 
    <img 
      height='100%' 
      width='100%'
      object-fit='contain' 
      src={this.state.imageUrl} /> : null;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Lat:
          <input 
          type="text"
          value={this.state.lat}
          disabled/>
        </label>
        <label>Lng:
          <input 
          type="text"
          value={this.state.lng}
          disabled/>
        </label>
        <label>Description:
          <textarea 
          cols="30"
          rows="10"
          value={this.state.description}
          onChange={this.update('description')}
          placeholder={'description here'}></textarea>
        </label>
        <label>Seating:
          <input 
          type="number"
          value={this.state.seating}
          onChange={this.update('seating')}
          min="2" 
          max="20"/>
        </label>

        <div className='image-preview'>
          <h3>Image preview</h3>
          <input type="file" onChange={this.previewImage}/>
          {preview}
        </div>

        <input 
          type="submit"
          value="Create Bench"/>
        
        <button
          onClick={this.navigateToSearch}>
            Cancel
          </button>
      </form>
    )
  }
}
