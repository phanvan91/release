import moment from 'moment'

export const dateTimeFormat = datetime => {
  if (!datetime) {
    return ''
  }
  
  return moment(datetime).format('Y-MM-DD HH:mm:ss')
}
