import type {DateInputReturnType, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {HTMLNextUIProps} from "@nextui-org/system";
import type {DateInputProps} from "@nextui-org/date-input";

import {createCalendar} from "@internationalized/date";
import {forwardRef, useRef} from "react";
import {DateValue} from "@react-types/datepicker";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {ForwardedRef, ReactElement} from "react";
import {useDateFieldState} from "@react-stately/datepicker";
import {DateInputSegment} from "@nextui-org/date-input";
import {filterDOMProps, useDOMRef} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {mergeProps} from "@react-aria/utils";
import * as React from "react";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDatePickerProps<T> | "onChange"
>;

export interface Props<T extends DateValue>
  extends NextUIBaseProps<T>,
    AriaDatePickerProps<T>,
    Pick<DateInputProps, "createCalendar"> {
  /** DateInput classes slots. */
  slots: DateInputReturnType;
  /** DateInput classes. */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export type DateRangePickerFieldProps<T extends DateValue = DateValue> = Props<T>;

const DateRangePickerField = forwardRef(function DateRangePickerField<T extends DateValue>(
  props: DateRangePickerFieldProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, slots, createCalendar: createCalendarProp, classNames, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {locale} = useLocale();

  let state = useDateFieldState({
    ...otherProps,
    locale,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const inputRef = useRef(null);

  const {fieldProps, isInvalid: ariaIsInvalid} = useAriaDateField(
    {...otherProps, inputRef},
    state,
    domRef,
  );

  const isInvalid = props.isInvalid || ariaIsInvalid;

  state.isInvalid = isInvalid;

  return (
    <>
      {React.createElement(
        Component,
        {...mergeProps(fieldProps, filterDOMProps(otherProps)), ref: {domRef}},
        <>
          {state.segments.map((segment, i) => (
            <DateInputSegment
              key={i}
              classNames={classNames}
              segment={segment}
              slots={slots}
              state={state}
            />
          ))}
        </>,
      )}
    </>
  );
}) as <T extends DateValue>(props: DateRangePickerFieldProps<T>) => ReactElement;

export default DateRangePickerField;
