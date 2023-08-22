import appAndPages from './app-and-pages'
import charts from './charts'
import classes from './classes'
import dashboard from './dashboard'
import forms from './forms'
import others from './others'
import uiElements from './ui-elements'
import type { VerticalNavItems } from '@/@layouts/types'

export default [...classes, ...dashboard, ...appAndPages, ...uiElements, ...forms, ...charts, ...others] as VerticalNavItems
