
import AtmosphericInfo from './AtmosphericInfo'
import FacilitySourceInfo from './FacilitySourceInfo'
import ObservationInfo from './ObservationInfo'
import SourceLayoutSketch from './SourceLayoutSketch'



export default function VisibleEmissionsPartOne() {
  return (
    <div>
        <h2 className='text-xl font-medium text-center'>Visible Emissions Observation Form</h2>
        <FacilitySourceInfo />
        <ObservationInfo />
        <AtmosphericInfo/>
        <SourceLayoutSketch/>
    </div>
  )
}
