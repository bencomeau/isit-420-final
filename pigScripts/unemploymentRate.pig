--   pig -x local unemploymentRate.pig
-- Data ranges from January 2011 - 2019

-- Headers are as such:
-- date URATE

-- Load all the data
UnemploymentRatesA = LOAD 'unemploymentRateData.csv' USING PigStorage(',');

-- Since we have a header, stream the data records using tail so we may
-- ignore the header. The -n + 2 says start tailing the data at line 2.
UnemploymentRatesB = STREAM UnemploymentRatesA THROUGH `tail -n +2` AS
    (date:chararray, rate:float);

-- Data is already subset, so just generate unique ID
-- for both the unemployment table and the date
UnemploymentRatesC = RANK UnemploymentRatesB;

-- Create and store subset table for ReportingDates
ReportingDatesData = FOREACH UnemploymentRatesC GENERATE $0 as id, $1;
STORE ReportingDatesData INTO 'ReportingDatesOutput' USING PigStorage (',');

-- Rename, remove, and store columns using new unique identifier for date
UnemploymentRatesData = FOREACH UnemploymentRatesC GENERATE $0 AS id, $0 AS date_id, $2 as rate;
STORE UnemploymentRatesData INTO 'UnemploymentRatesOutput' USING PigStorage (',');