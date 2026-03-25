# דמו: מיזוג Spec נפרד ל-Spec הכללי

> שיחה עם Kiro שמדגימה תהליך מיזוג spec של feature (file-size-limit-update) לתוך ה-spec הכללי של הפרויקט.

---

## הקשר

הפרויקט: **Secure File Distribution Service** - מערכת serverless להעלאה, אחסון והפצה מאובטחת של קבצים על AWS.

במהלך הפיתוח נוצר spec נפרד בתיקייה `.kiro/specs/file-size-limit-update/` שמתאר עדכון של מגבלת גודל הקובץ מ-10GB ל-5MB. ה-spec הכללי נמצא ב-`.kiro/specs/` (requirements.md, design.md, tasks.md).

---

## השיחה

### 👤 משתמש:
> אני רוצה למזג את ה-SPEC של file-size-limit-update ל-SPEC הכללי, איך אתה ממליץ לעשות את זה?

### 🤖 Kiro:

Kiro בדק את שני ה-specs (הנפרד והכללי) והציע 3 אופציות:

**אופציה 1: מיזוג מלא לתוך ה-spec הכללי** (מומלץ)
- עדכון requirements.md הכללי - שינוי מ-10GB ל-5MB והסרת multipart
- עדכון design.md הכללי - עדכון Upload Handler והסרת לוגיקת multipart
- הוספת המשימות ל-tasks.md הכללי כ-Task חדש
- מחיקת התיקייה file-size-limit-update

**אופציה 2: שמירה כ-spec נפרד עם קישור** (פחות מומלץ)
- השארת file-size-limit-update כ-spec עצמאי
- הוספת קישור ב-requirements.md הכללי

**אופציה 3: מיזוג חלקי** (מומלץ ביותר)
- עדכון requirements.md ו-design.md הכלליים
- שמירת file-size-limit-update כתיעוד היסטורי

---

### 👤 משתמש:
> כרגע רוצה אופציה 1

### 🤖 Kiro:

Kiro ביצע את המיזוג המלא באופן אוטומטי:

#### שלב 1: עדכון requirements.md הכללי

שינויים שבוצעו:
- מטרות המערכת: "תמיכה בקבצים גדולים: עד 10GB עם multipart upload" → "תמיכה בקבצים: עד 5MB עם העלאה פשוטה"
- סעיף העלאת קבצים: הסרת multipart, הוספת הודעות שגיאה בעברית, תאימות לאחור
- מגבלות טכניות: עדכון מ-10GB ל-5MB, הוספת הערה על קבצים legacy
- קריטריוני הצלחה: עדכון מ-"1 דקה לקובץ 1GB" ל-"10 שניות לקובץ 5MB"
- ניהול מחזור חיים: הסרת "multipart" מ-cleanup

#### שלב 2: עדכון design.md הכללי

שינויים שבוצעו:
- API Endpoints: "סיום multipart upload" → "סיום העלאה"
- Upload Handler Flow: הוספת validation של 5MB, הסרת multipart
- Environment Variables: הסרת `MAX_FILE_SIZE_GB` ו-`MULTIPART_THRESHOLD_MB`, הוספת `MAX_FILE_SIZE_BYTES`
- Data Flow - Upload: הוספת בדיקת גודל קובץ, שימוש ב-single presigned URL
- UploadSession Table: הסרת שדות multipart, הוספת שדות legacy (deprecated)
- FileMetadata Table: הוספת הערה על קבצים legacy
- Performance Optimization: הסרת "S3 multipart for large files"
- אומדן עלויות: עדכון לקבצים קטנים יותר

#### שלב 3: הוספת Task 15 ל-tasks.md הכללי

Task 15 חדש נוסף עם כל ה-subtasks מה-spec המקורי:
- 15.1-15.14 עם סטטוס מעודכן (חלק כבר הושלמו ✅)
- משימות אופציונליות מסומנות ב-`*` (property-based tests)
- רשימת קבצים מושפעים
- הערות על testing ותאימות לאחור
- עדכון סדר עדיפויות (Task 15 במקום הראשון)

#### שלב 4: מחיקת ה-spec הנפרד

קבצים שנמחקו:
- `.kiro/specs/file-size-limit-update/requirements.md`
- `.kiro/specs/file-size-limit-update/design.md`
- `.kiro/specs/file-size-limit-update/tasks.md`
- `.kiro/specs/file-size-limit-update/.config.kiro`

---

## סיכום

התהליך הדגים כיצד Kiro יכול:
1. **לנתח** שני specs ולהבין את ההבדלים ביניהם
2. **להציע** אופציות מיזוג שונות עם יתרונות וחסרונות
3. **לבצע** מיזוג מלא באופן אוטומטי - עדכון 3 קבצים ומחיקת 4 קבצים
4. **לשמור** על עקביות בין כל חלקי ה-spec (requirements, design, tasks)
5. **לנקות** את ה-spec הנפרד אחרי המיזוג

כל זה בוצע בשיחה אחת, ללא צורך בעריכה ידנית של הקבצים.
