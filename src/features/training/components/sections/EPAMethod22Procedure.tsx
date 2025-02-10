
import { FormModalProvider } from '../../context/FormModalContext'
import EmissionFrequency from './EmissionFrequency'
import EPAMethod22 from './EPAMethod22'
import ObservationInfoEPA from './ObservationInfoEPA'
import ObservationPositionSketch from './ObservationPositionSketch'

const EPAMethod22Procedure = () => {
  return (
    <FormModalProvider>
      <section className='py-8 px-4 lg:px-14 bg-white  p-8'>
        <EPAMethod22 />
        <ObservationPositionSketch />
        <ObservationInfoEPA />
        <EmissionFrequency />
      </section>
    </FormModalProvider>
  )
}

export default EPAMethod22Procedure
