# react-hook-form-bools

To reproduce:

1. `npm i`
2. `npm test`<br/>Note the error messages (both the prop types warning and the failed submission, apparently because MUI incorrectly handles the numeric prop).
3. Then retest against React Hook Form 7.70.0:<br/>`npm i react-hook-form@7.70.0`
4. `npm test`

Note that it works as expected.