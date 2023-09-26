delete fldmaster where objname = 'SA.BANKACCT' and fldname in ('FROMDATE','TODATE');

INSERT INTO fldmaster 
VALUES('SA','FROMDATE','SA.BANKACCT','FROMDATE','Hiệu lực từ',NULL,7,'D',NULL,'dd/MM/yyyy',20,20,' ',' ',NULL,'Y','Y','Y',' ',' ','N','D',NULL,NULL,NULL,NULL,'##########',NULL,'ITEMLIMIT',NULL,NULL,'T','N','MAIN',NULL,NULL,NULL,'N',NULL,'Y',NULL,'N',NULL,NULL,NULL,'N','Y',NULL,NULL,NULL,NULL,'D',NULL);
INSERT INTO fldmaster 
VALUES('SA','TODATE','SA.BANKACCT','TODATE','Hiệu lực đến',NULL,8,'D',NULL,'dd/MM/yyyy',20,20,' ',' ',NULL,'Y','Y','Y',' ',' ','N','D',NULL,NULL,NULL,NULL,'##########',NULL,'ITEMLIMIT',NULL,NULL,'T','N','MAIN',NULL,NULL,NULL,'N',NULL,'Y',NULL,'N',NULL,NULL,NULL,'N','Y',NULL,NULL,NULL,NULL,'D',NULL);

UPDATE SEARCH
SET SEARCHCMDSQL=TO_NCLOB(q'[SELECT R.AUTOID, R.BANKCODE, R.ACNAME, TO_CHAR(R.FROMDATE,'DD/MM/YYYY') FROMDATE, TO_CHAR(R.TODATE,'DD/MM/YYYY') TODATE,
    R.TYPOFACCT ,A0.CDCONTENT TYPOFACCT_LB, R.GLACCOUNT, R.BANKACCTNO, R.NOTES, R.OWNERCD, A1.cdcontent OWNERCD_LB, A2.CDCONTENT STATUS_LB, R.STATUS
FROM BANKACCT R, ALLCODE A0, ALLCODE A1, ALLCODE A2
WHERE A0.CDTYPE='SA' AND A0.CDNAME='TYPOFACCT' AND A0.CDVAL=R.TYPOFACCT
AND A1.CDTYPE='SY' AND A1.CDNAME = 'YESNO' AND A1.CDVAL = R.OWNERCD
and A2.CDTYPE = 'SA' AND A2.CDNAME = 'STATUS' and A2.CDVAL = R.STATUS
and r.BANKCODE = '<$BANKCODE]')
|| TO_NCLOB(q'[>']')
where searchcode = 'BANKACCT';

UPDATE focmdcode
SET CMDTEXT='BEGIN EWL_KE_TOAN.prc_mt_bankacct(:p_autoid,:p_bankcode,:p_typofacct,:p_glaccount,:p_bankacctno,:p_notes,:p_acname,:p_fromdate,:p_todate,:pv_tlid,:pv_role,:pv_action,:pv_language,:pv_objname,:p_err_code,:p_err_param); END;'
where cmdcode = 'prc_mt_bankacct';