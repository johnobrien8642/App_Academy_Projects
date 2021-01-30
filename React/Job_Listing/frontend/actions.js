const SWITCH_LOCATION = "SWITCH_LOCATION";


const selectLocation = (city = '', jobs = []) => ({
  type: SWITCH_LOCATION,
  city,
  jobs
})

export default selectLocation;