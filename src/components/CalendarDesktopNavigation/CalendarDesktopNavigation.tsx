import React, { useContext } from 'react';

import HeaderCalendarTitle from '../headerCalendarTitle/HeaderCalendarTitle';
import { Context } from '../../context/store';
import HeaderCalendarButtons from '../headerCalendarButtons/HeaderCalendarButtons';
import { parseClassName, parseCssDark } from '../../utils/common';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import { EvaIcons } from '../eva-icons';
import { getNewCalendarDays } from '../../utils/getCalendarDays';
import { DateTime } from 'luxon';
import { CALENDAR_VIEW } from '../../common/enums';
import DesktopLayout from '../desktopLayout/DesktopLayout';
import MobileLayout from '../mobileLayout/MobileLayout';
import ButtonBase from '../buttonBase/ButtonBase';
import MobileDropdown from '../mobileDropdown/MobileDropdown';

interface CalendarDesktopNavigationProps {
  disabledViews?: CALENDAR_VIEW[];
  setViewChanged: any;
  disableMobileDropdown?: boolean;
}

/**
 * Title with calendar navigation buttons for desktop layout
 * @param props
 * @constructor
 */
const CalendarDesktopNavigation = (props: CalendarDesktopNavigationProps) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { isDark, calendarDays, selectedView, selectedDate, isMobile } = store;

  const title: string = DateTime.fromISO(selectedDate).toFormat('MMMM yyyy');

  const navigateBackwards = async (): Promise<void> =>
    await getNewCalendarDays(calendarDays, selectedView, false, setContext);
  const navigateForward = async (): Promise<void> =>
    await getNewCalendarDays(calendarDays, selectedView, true, setContext);

  const navigateToToday = async (): Promise<void> => {
    // temp fix for navigation to correct date
    if (
      selectedView === CALENDAR_VIEW.DAY ||
      selectedView === CALENDAR_VIEW.THREE_DAYS
    ) {
      await getNewCalendarDays(
        [DateTime.now().minus({ days: 1 })],
        selectedView,
        true,
        setContext
      );
    } else {
      await getNewCalendarDays(
        [DateTime.now()],
        selectedView,
        false,
        setContext
      );
    }
  };

  return (
    <div
      className={parseClassName(
        'Calend__CalendarDesktopNavigation__container',
        isMobile,
        isDark
      )}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <DesktopLayout>
          <div className={'Calend__CalendarDesktopNavigation__buttons'}>
            <>
              <ButtonBase
                className={'Calend__calendarButtonToday'}
                isDark={isDark}
                onClick={navigateToToday}
              >
                Today
              </ButtonBase>
              <ButtonIcon
                isDark={isDark}
                key={'left'}
                onClick={navigateBackwards}
              >
                <EvaIcons.ChevronLeft
                  className={parseCssDark('Calend__icon-svg', isDark)}
                />
              </ButtonIcon>
              <ButtonIcon
                isDark={isDark}
                key={'right'}
                onClick={navigateForward}
              >
                <EvaIcons.ChevronRight
                  className={parseCssDark('Calend__icon-svg', isDark)}
                />
              </ButtonIcon>
            </>
          </div>
        </DesktopLayout>
        <HeaderCalendarTitle title={title} />
        <MobileLayout style={{ width: '100%' }}>
          <div className={'Calend__CalendarDesktopNavigation__buttons'}>
            <>
              <ButtonIcon
                isDark={isDark}
                key={'left'}
                onClick={navigateBackwards}
              >
                <EvaIcons.ChevronLeft
                  className={parseCssDark('Calend__icon-svg', isDark)}
                />
              </ButtonIcon>
              <ButtonIcon
                isDark={isDark}
                key={'right'}
                onClick={navigateForward}
              >
                <EvaIcons.ChevronRight
                  className={parseCssDark('Calend__icon-svg', isDark)}
                />
              </ButtonIcon>
              <ButtonIcon
                isDark={isDark}
                key={'calendar'}
                onClick={navigateToToday}
              >
                <EvaIcons.Calendar
                  className={parseCssDark('Calend__icon-svg', isDark)}
                />
              </ButtonIcon>
              <MobileDropdown
                disabledViews={props.disabledViews}
                setViewChanged={props.setViewChanged}
                disableMobileDropdown={props.disableMobileDropdown}
              />
            </>
          </div>
        </MobileLayout>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // width: '100%',
          marginRight: 12,
          justifyContent: 'flex-end',
          flex: 'auto',
        }}
      >
        <DesktopLayout>
          <HeaderCalendarButtons
            disabledViews={props.disabledViews}
            setViewChanged={props.setViewChanged}
          />
        </DesktopLayout>
      </div>
    </div>
  );
};

export default CalendarDesktopNavigation;
