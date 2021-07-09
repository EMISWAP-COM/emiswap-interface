import React, { FC } from 'react';

import * as Styled from './styles';
import { convertBigDecimal, convertDate, DateFormat, shortenHash } from '../../../../uitls';
import { ExternalLink } from '../../../../../../theme';
import { Level } from '../../../../styleds';

export interface CellProps extends Record<string, any> {
  wrapper?: WrapperProp;
  key: string;
  label: React.ReactNode;
  row?: Record<string, any>;
  head?: React.ComponentType<CellProps>;
  cell?: React.ComponentType<CellProps>;
}

type Renders =
  | 'text'
  | 'date'
  | 'dateTime'
  | 'level'
  | 'cost'
  | 'bonus'
  | 'percent'
  | 'wallet'
  | 'dai'
  | 'esw';

export const headRenders: Record<Renders, FC<CellProps>> = {
  text: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  percent: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  date: props => <Styled.DateField children={props.children} />,
  dateTime: props => <Styled.DateField children={props.children} />,
  level: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  cost: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  dai: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  esw: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  bonus: props => <Styled.LevelWrapper flex={props.flex} children={props.children} />,
  wallet: props => <Styled.Wallet children={props.children} />,
};

export const HeadCell: React.FC<CellProps> = props => {
  const CellComponent = props.head ?? headRenders.text;
  return <CellComponent {...props} children={props.label} />;
};

export interface WrapperProp<T extends {} = {}> {
  mapToProps: (row: Record<string, any>) => Partial<T>;
  component: React.ComponentType<T>;
}

export interface WrappedProps {
  props?: Record<string, any>;
  wrapper?: React.ComponentType;
}

export const Wrapped: React.FC<Record<string, any> & WrappedProps> = props => {
  const { wrapper: Wrapper, ...rest } = props;
  return Wrapper ? <Wrapper children={props.children} {...rest} /> : <>{props.children}</>;
};

export const cellRenders: Record<Renders, FC<CellProps>> = {
  text: props => <Styled.LevelWrapper children={props.children} />,
  percent: props => <Styled.LevelWrapper children={props.truncatePercent ? <>{props.children}%</> : `${props.children}%`} />,
  date: props => (
    <Styled.DateField>{convertDate(`${props.children}`, DateFormat.short_day)}</Styled.DateField>
  ),
  dateTime: props => (
    <Styled.DateField>{convertDate(`${props.children}`, DateFormat.full)}</Styled.DateField>
  ),
  level: props => (
    <>
      <Styled.Label>{props.label}</Styled.Label>
      <Styled.LevelWrapperLabeled>
        <Level>{props?.row?.level}lvl</Level>
        <Styled.Cost>
          <span>{props.children ? convertBigDecimal(`${props.children}`) : '-'}</span>&nbsp;{' '}
          {props?.row?.token}
        </Styled.Cost>
      </Styled.LevelWrapperLabeled>
    </>
  ),
  cost: props => (
    <>
      <Styled.Label>{props.label}</Styled.Label>
      <Styled.LevelWrapper>
        <Styled.Cost>
          <span>{props.children ? convertBigDecimal(`${props.children}`) : '-'}</span>&nbsp;{' '}
          {props.row.token}
        </Styled.Cost>
      </Styled.LevelWrapper>
    </>
  ),
  dai: props => (
    <>
      <Styled.Label>{props.label}</Styled.Label>
      <Styled.LevelWrapper>
        <Styled.Cost>
          <span>{props.children ? convertBigDecimal(`${props.children}`) : '-'}</span>&nbsp; DAI
        </Styled.Cost>
      </Styled.LevelWrapper>
    </>
  ),
  esw: props => (
    <>
      <Styled.Label>{props.label}</Styled.Label>
      <Styled.LevelWrapper>
        <Styled.Cost>
          <span>{props.children ? convertBigDecimal(`${props.children}`) : '-'}</span>&nbsp; ESW
        </Styled.Cost>
      </Styled.LevelWrapper>
    </>
  ),
  bonus: props => (
    <>
      <Styled.Label>{props.label}</Styled.Label>
      <Styled.LevelWrapper>
        <Styled.BonusName>{props.children}</Styled.BonusName>&nbsp;
      </Styled.LevelWrapper>
    </>
  ),
  wallet: props => (
    <>
      <Styled.Label>{props.label}</Styled.Label>
      <ExternalLink href={`${props?.url}/tx/${props.children}`}>
        <Styled.Wallet>{shortenHash(`${props.children}`)}</Styled.Wallet>
      </ExternalLink>
    </>
  ),
};

export const Cell: React.FC<CellProps> = props => {
  const CellComponent = props.cell ?? cellRenders.text;
  return (
    <Styled.StyledCell flex={props.flex}>
      <CellComponent {...props} />
    </Styled.StyledCell>
  );
};

export interface TableProps {
  disable?: boolean;
  title: string;
  data?: Record<string, any>[];
  fields?: CellProps[];
  desktopMaxHeight?: number;
  rightTitle?: React.ReactNode;
  truncatePercent?: boolean;
  headerMarginTop?: number;
  headerMarginBottom?: number;
  headerWrapperMarginTop?: number;
}

export const Table: React.FC<TableProps> = ({
  disable,
  title,
  rightTitle,
  desktopMaxHeight,
  fields,
  data,
  children,
  truncatePercent,
  headerMarginTop,
  headerMarginBottom,
  headerWrapperMarginTop,
}) =>
  disable ? null : (
    <Styled.Wrapper>
      <Styled.FlexBetween marginTop={headerWrapperMarginTop}>
        <Styled.TableHeader marginTop={headerMarginTop} marginBottom={headerMarginBottom} >{title}</Styled.TableHeader>
        {rightTitle}
      </Styled.FlexBetween>
      <Styled.TableWrapper desktopMaxHeight={desktopMaxHeight}>
        {fields?.length ? (
          <>
            <Styled.TableTitles>
              {fields.map(field => (
                <HeadCell key={field.key} {...field} />
              ))}
            </Styled.TableTitles>

            {data?.length ? (
              data.map((row, rowKey) => (
                <Styled.TableRow key={`row_${rowKey}`}>
                  {fields?.map(field => (
                    <Cell key={field.key} {...field} row={row} truncatePercent={truncatePercent}>
                      {field?.wrapper ? <Wrapped
                          wrapper={field?.wrapper?.component}
                          {...field?.wrapper?.mapToProps?.(row)}
                        /> : (row[field.key] ?? '')}
                    </Cell>
                  ))}
                </Styled.TableRow>
              ))
            ) : (
              <Styled.TableRow>
                <Styled.NoContent>No content</Styled.NoContent>
              </Styled.TableRow>
            )}

            {children}
          </>
        ) : (
          <Styled.TableRow>
            <Styled.NoContent>No content</Styled.NoContent>
          </Styled.TableRow>
        )}
      </Styled.TableWrapper>
    </Styled.Wrapper>
  );
