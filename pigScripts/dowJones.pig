-- pig -x local dowJones.pig
-- Data ranges from March 2010 - 2019

-- Headers are as such:
-- time	open	high	low	close	vol	id	timestamp	Relative Strength Index	Average Directional Index	Correlation Coefficient
-- timestamp is formatted as: 2010-03-04 14:30:00 which is annoying since it's not ISO-8601 and thus is hard to format with PIG
-- to solve, we can simply substring the date, stripping the time data from the datestring.

-- Load all the data, including the reporting dates we created via unemploymentRate so we can join
ReportingDates = LOAD 'ReportingDatesOutput/part-m-00000' USING PigStorage(',') as (id:int, reporting_date:chararray);
DowA = LOAD 'dowJonesData.csv' USING PigStorage(',');

-- Define the ADI data

-- Since we have a header, stream the data records using tail so we may
-- ignore the header. The -n + 2 says start tailing the data at line 2.
DowB = STREAM DowA THROUGH `tail -n +2` AS
    (time:int, open:float, high:float, low:float, close:float,
        vol:int, id:chararray, timestamp:chararray, relativeStrength:float,
        averageDirectionalIndex:float, correlationCoefficient:int);

-- Remove some columns we don't need, create the date (YYYY-MM-DD), set the ADI foreign key
DowC = FOREACH DowB GENERATE SUBSTRING($7, 1, 11) as reporting_date, (
    CASE
    WHEN $9 < 20 THEN 1
    WHEN $9 > 25 THEN 3
    ELSE 2 END
    ) as adi, $1 as open_value, $3 as close_value;

-- Data will be: reporting_date_id, reporting_date, reporting_date, adi_id, open, close
-- Example: 2,2011-02-01,2011-02-01,3,11892.5,11892.5
JoinedWithReportingDates = JOIN ReportingDates BY reporting_date, DowC BY reporting_date;

-- Create a unique ID
DowD = RANK JoinedWithReportingDates;

-- Rename, remove, and store data
DowE = FOREACH DowD GENERATE
    $0 as id, $1 as date_id, $4 as average_directional_index_id, $5 as open_value, $6 as close_value;

STORE DowE INTO 'DowJonesOutput' USING PigStorage (',');
