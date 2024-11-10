import React from 'react';

function Sidebar({ setCodeExample }) {
  const codeExamples = {

// Hive Ql Journey
readhive:`# Import required libraries
from pyspark.sql import SparkSession
# Create Spark session
spark = SparkSession.builder.appName('DataProcessing').getOrCreate()
# Read data using SQL
df = spark.sql('''
SELECT * 
FROM dbname.table_name
''')`,

Fillnull:`
# Process data static
# Fill null values
df = df.na.fill('Missing Value', ['column_name'])
`,
DropNull:`
# Process data static
# Drop rows with null values
df = df.na.drop(subset=['column_name'])`,
ChangeColumnType:`
# Process data static
from pyspark.sql.types import StringType, IntegerType
from pyspark.sql.functions import col

# Change column types
df = df.withColumn('column_name', col('column_name').cast(StringType()))
`,
Addsequence:`
# Process data 
from pyspark.sql.window import Window
from pyspark.sql.functions import row_number

# Add sequence number
window = Window.orderBy('id')
df = df.withColumn('sequence', row_number().over(window))
`,
Renamecolumn:`
# Process data static
# Rename columns
df = df.withColumnRenamed('column_name', 'new_column_name')

`,
Writeastable:`
# Write processed data  SQL
df.write.option('path', 'hdfs://PROD-HDFS-NN-HA/warehouse/tablespace/external/hive/ENter_DataBase_Name.db/Enter_newtable_name')/
.saveAsTable('dbname.table_name')
`,
// Join example
join: `
# Perform a join between two DataFrames
df1 = spark.sql("SELECT * FROM dbname.table1")
df2 = spark.sql("SELECT * FROM dbname.table2")

# Inner join on a specific column
joined_df = df1.join(df2, df1['common_column'] == df2['common_column'], 'inner')
joined_df.show()
`,

// Union example
union: `
# Union two DataFrames
df1 = spark.sql("SELECT * FROM dbname.table1")
df2 = spark.sql("SELECT * FROM dbname.table2")

# Ensure both DataFrames have the same schema before union
union_df = df1.union(df2)
union_df.show()
`,
povit:`
# Import required functions
from pyspark.sql.functions import col

# Pivot the data
pivoted_df = df.groupBy('group_column')
          .pivot('pivot_column')
               .agg({'value_column': 'sum'})  # You can change 'sum' to other aggregate functions like 'avg', 'max', etc.

pivoted_df.show()`,

OptimizingRead:`df.write.partitionBy('partition_column').format('parquet').saveAsTable('dbname.optimized_table')
`,
InteractingwithHDFS:`df.write.option('path', 'hdfs://path/to/hive/table').saveAsTable('dbname.new_table')
`,

    // Load Data
    readCSV: `from pyspark.sql import SparkSession\n\n# قراءة بيانات CSV\nspark = SparkSession.builder.appName("Read CSV").getOrCreate()\ndf = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)\ndf.show()`,
    readSQL: `from pyspark.sql import SparkSession\n\n# قراءة بيانات من قاعدة بيانات SQL\nspark = SparkSession.builder.appName("Read SQL").getOrCreate()\ndf = spark.read.format("jdbc") \n.option("url", "jdbc:postgresql://hostname:port/dbname")\n.option("dbtable", "table_name")\n.option("user", "username")\n.option("password", "password")\n.load()\ndf.show()`,

    readOracle: `from pyspark.sql import SparkSession\n\n# قراءة بيانات من Oracle\nspark = SparkSession.builder.appName("Read Oracle").getOrCreate()\ndf = spark.read.format("jdbc") \n.option("url", "jdbc:oracle:thin:@//hostname:port/service_name")\n.option("dbtable", "table_name")\n.option("user", "username")\n.option("password", "password")\n.load()\ndf.show()`,
    readMongoDB: `from pyspark.sql import SparkSession\n\n# قراءة بيانات من MongoDB\nspark = SparkSession.builder.appName("Read MongoDB").getOrCreate()\ndf = spark.read.format("mongo")\n.option("uri", "mongodb://username:password@hostname:port/dbname.collection")\n.load()\ndf.show()`,
    writeCSV: `# كتابة البيانات إلى CSV\ndf.write.csv("path/to/output.csv")`,
    
    // Explore Data Analysis 
    printschemaa: `\n# طباعة مخطط البيانات\ndf.printSchema()`,
    //from pyspark.sql import SparkSession\n\n# طباعة مخطط البيانات\nspark = SparkSession.builder.appName("Print Schema Example").getOrCreate()\ndf = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)\n
    // from pyspark.sql import SparkSession\nspark = SparkSession.builder.appName("Basic Statistics").getOrCreate()\ndf = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)\n
    basicStatistics: `from pyspark.sql.functions import avg, max, min\n\n# (static)إحصائيات أساسية\ndf.select(avg("column_name"), max("column_name"), min("column_name")).show()`,
    //from pyspark.sql import SparkSession\n\nspark = SparkSession.builder.appName("Group By Example").getOrCreate()\ndf = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)\nd
    groupBy: `# (static)التجميع حسب عمود\ndf.groupBy("column_name").count().show()`,
    // from pyspark.sql import SparkSession\n\nspark = SparkSession.builder.appName("Correlation Example").getOrCreate()df = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)
    correlation: `#  حساب الارتباط بين الاعمده\n\n\ncorrelation = df.stat.corr("column1", "column2")\nprint("Correlation: ", correlation)`,
    // from pyspark.sql import SparkSessionspark = SparkSession.builder.appName("Null Values Example").getOrCreate()df = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)
    nullValues: `\n\n# عدد القيم الفارغة في كل الاعمده \n\n\ndf.select([count(when(isnull(c), c)).alias(c) for c in df.columns]).show()`,

    // Transformation Data
    dataPrep: `from pyspark.ml.feature import StandardScaler\nfrom pyspark.ml.linalg import Vectors\n\n# بيانات نموذجية للتقييس\nspark = SparkSession.builder.appName("MLlib Data Preparation").getOrCreate()\ndata = [(0, Vectors.dense([1.0, 0.1, -1.0]),), (1, Vectors.dense([2.0, 1.1, 1.0]),)]\ndf = spark.createDataFrame(data, ["id", "features"])\nscaler = StandardScaler(inputCol="features", outputCol="scaledFeatures")\nscalerModel = scaler.fit(df)\nscaledData = scalerModel.transform(df)\nscaledData.show()`,
    // New Examples
  replaceDollar: `from pyspark.sql.functions import regexp_replace\n\n# استبدال علامة الدولار ($) في عمود\nnew_df = df.withColumn("new_column", regexp_replace("column_name", "\\$", ""))\nnew_df.show()`,
  changeDataType: `# تغيير نوع البيانات\nnew_df = df.withColumn("column_name", df["column_name"].cast("integer"))\nnew_df.printSchema()`,
  changeDateFormat: `from pyspark.sql.functions import date_format\n\n# تغيير تنسيق التاريخ\nnew_df = df.withColumn("formatted_date", date_format("date_column", "yyyy-MM-dd"))\nnew_df.show()`,
    // Visualization Data
    visualizationExample: `import matplotlib.pyplot as plt\nimport pandas as pd\n\n# مثال على التصور باستخدام Pandas وMatplotlib\n# يجب تحويل DataFrame Spark إلى DataFrame Pandas أولاً\npdf = df.toPandas()\nplt.figure(figsize=(10,6))\nplt.bar(pdf['column_name'], pdf['another_column'])\nplt.title('Visualization Example')\nplt.show()`
  };
  const explanations = {
    // رحلة Hive QL
    readhive: "هذا الكود يوضح كيفية قراءة البيانات من جداول Hive باستخدام SQL في Spark.",
    Fillnull: "هذا المثال يوضح كيفية ملء القيم الفارغة في عمود معين باستخدام قيمة افتراضية.",
    DropNull: "هذا الكود يوضح كيفية حذف الصفوف التي تحتوي على قيم فارغة في عمود معين من DataFrame.",
    ChangeColumnType: "يوضح هذا المثال كيفية تغيير نوع بيانات عمود في DataFrame باستخدام الدالة cast.",
    Addsequence: "هذا الكود يوضح كيفية إضافة تسلسل أرقام إلى DataFrame باستخدام وظيفة نافذة.",
    Renamecolumn: "يوضح هذا الكود كيفية إعادة تسمية عمود في DataFrame.",
    Writeastable:'هذا الكود يوضح كيفية كتابة البيانات من جداول Hive باستخدام SQL في Spark.',
    // تحميل البيانات
    readCSV: "يوضح هذا الكود كيفية قراءة البيانات من ملف CSV إلى DataFrame في Spark مع استنتاج العنوان والهيكل تلقائيًا.",
    readSQL: "هذا المثال يوضح كيفية قراءة البيانات من قاعدة بيانات SQL باستخدام JDBC.",
    readOracle: "يوضح هذا الكود كيفية قراءة البيانات من قاعدة بيانات Oracle باستخدام JDBC.",
    readMongoDB: "يوضح هذا المثال كيفية قراءة البيانات من MongoDB.",
    writeCSV: "يوضح هذا المقتطف كيفية كتابة البيانات من DataFrame إلى ملف CSV.",
  
    // استكشاف تحليل البيانات
    printschemaa: "يوضح هذا المثال كيفية طباعة مخطط DataFrame لعرض أسماء الأعمدة وأنواع بياناتها.",
    basicStatistics: "يوضح هذا الكود كيفية حساب إحصائيات أساسية مثل المتوسط والحد الأقصى والحد الأدنى لعمود معين في DataFrame.",
    groupBy: "يوضح هذا المثال كيفية تجميع البيانات وفقًا لعمود معين وعدّ عدد التكرارات لكل قيمة.",
    correlation: "يوضح هذا الكود كيفية حساب معامل الارتباط بين عمودين في DataFrame.",
    nullValues: "يوضح هذا المثال كيفية حساب عدد القيم الفارغة في كل عمود من أعمدة DataFrame.",
  
    // إعداد البيانات
    dataPrep: "يوضح هذا الكود كيفية إعداد البيانات باستخدام مكتبة MLlib في Spark.",
    replaceDollar: "يوضح هذا الكود كيفية استبدال علامة الدولار ($) في عمود من DataFrame باستخدام الدالة regexp_replace.",
    changeDataType: "يوضح هذا المثال كيفية تغيير نوع البيانات لعمود معين في DataFrame.",
    changeDateFormat: "يوضح هذا الكود كيفية تغيير تنسيق التاريخ في عمود باستخدام الدالة date_format.",
  
    // تصور البيانات
    visualizationExample: "يوضح هذا المثال كيفية استخدام مكتبة Matplotlib لتصور بيانات DataFrame بعد تحويلها إلى DataFrame من Pandas."
  };
  
//   const explanations = {
//     // Hive Ql Journey

//     readhive:``,

// Fillnull:`

// `,
// DropNull:`
// `,
// ChangeColumnType:`

// `,
// Addsequence:`

// `,
// Renamecolumn:`


// `,
//     readCSV: "هذا الكود يوضح كيفية قراءة البيانات من ملف CSV إلى DataFrame في Spark، مع تمكين استنتاج العنوان والهيكل.",
//     readSQL: "هذا المثال يوضح كيفية قراءة البيانات من قاعدة بيانات SQL باستخدام JDBC.",
//     readOracle: "هذا الكود يوضح كيفية قراءة البيانات من قاعدة بيانات Oracle باستخدام JDBC.",
//     readMongoDB: "هذا المثال يوضح كيفية قراءة البيانات من MongoDB.",
//     writeCSV: "هذا المقتطف يوضح كيفية كتابة البيانات من DataFrame إلى ملف CSV.",
    
    
//     // Explanation for printschemaa
//     printschemaa: "هذا المثال يوضح كيفية طباعة مخطط DataFrame الذي يعرض أسماء الأعمدة وأنواع بياناتها.",
//     basicStatistics: "هذا الكود يوضح كيفية حساب إحصائيات أساسية مثل المتوسط والحد الأقصى والحد الأدنى لعمود معين في DataFrame.",
//     groupBy: "هذا المثال يوضح كيفية تجميع البيانات بناءً على عمود معين وعدّ عدد التكرارات لكل قيمة.",
//     correlation: "هذا الكود يحسب معامل الارتباط بين عمودين في DataFrame.",
//     nullValues: "هذا المثال يظهر كيفية حساب عدد القيم الفارغة في كل عمود من أعمدة DataFrame.",
//     Fillnull:`
//     # Process data
// # Fill null values
// df = df.na.fill('Missing Value', ['column_name'])
//     `,
//     dataPrep: "هذا الكود يوضح تقنيات إعداد البيانات في MLlib في Spark.",
//       // New Explanations
//   replaceDollar: "هذا الكود يوضح كيفية استبدال علامة الدولار ($) في عمود من DataFrame باستخدام الدالة regexp_replace.",
//   changeDataType: "هذا المثال يوضح كيفية تغيير نوع البيانات لعمود معين في DataFrame.",
//   changeDateFormat: "هذا الكود يوضح كيفية تغيير تنسيق التاريخ في عمود باستخدام الدالة date_format.",

//     visualizationExample: "هذا المثال يوضح كيفية استخدام مكتبة Matplotlib لتصور بيانات DataFrame باستخدام Pandas."
//   };

  return (
    <div style={{ width: '250px', backgroundColor: '#f1f1f1', padding: '20px' }}>
      {/* <h3>مواضيع Spark</h3> */}
      <h4>  [Hive Ql ]رحلة تحليل بيانات </h4>
      {Object.keys(codeExamples).filter(key => key.endsWith("hive") || key ===  "Fillnull" || key ===  "DropNull"|| key ===  "ChangeColumnType"|| key ===  "" || key ===  "Renamecolumn" ||  key === "Writeastable" ||  key === "join"||  key === "union"  ||  key ==="povit" ||  key ==="AddingSequenceNumbers" ||  key ==="OptimizingRead " ||  key ==="InteractingwithHDFS" ).map((key) => (
        <button 
          key={key}
          onClick={() => setCodeExample({ code: codeExamples[key], explanation: explanations[key] })}
          style={buttonStyle}
        >
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}

      {/* Load Data Section */}
      <h4>تحميل البيانات</h4>
      {Object.keys(codeExamples).filter(key => key.startsWith("read") || key === "writeCSV").map((key) => (
        <button 
          key={key}
          onClick={() => setCodeExample({ code: codeExamples[key], explanation: explanations[key] })}
          style={buttonStyle}
        >
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}

      {/* Explore Data Analysis Section */}
      <h4>استكشاف تحليل البيانات</h4>
      {Object.keys(codeExamples).filter(key => key.startsWith("basic") || key.startsWith("group") || key === "correlation" || key === "nullValues" || key === "printschemaa" || key ===  "Fillnull" ).map((key) => (
        <button 
          key={key}
          onClick={() => setCodeExample({ code: codeExamples[key], explanation: explanations[key] })}
          style={buttonStyle}
        >
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}

      {/* Transformation Data Section */}
      <h4>تحويل البيانات</h4>
      {Object.keys(codeExamples).filter(key => key === "dataPrep" || key === "replaceDollar" || key === "changeDataType" || key === "changeDateFormat" || key === "dataPrep" ).map((key) => (
        <button 
          key={key}
          onClick={() => setCodeExample({ code: codeExamples[key], explanation: explanations[key] })}
          style={buttonStyle}
        >
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}

      {/* Visualization Data Section */}
      <h4>تصور البيانات</h4>
      {Object.keys(codeExamples).filter(key => key === "visualizationExample").map((key) => (
        <button 
          key={key}
          onClick={() => setCodeExample({ code: codeExamples[key], explanation: explanations[key] })}
          style={buttonStyle}
        >
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </button>
      ))}

    </div>
  );
}

const buttonStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default Sidebar;

// import React from 'react';

// function Sidebar({ setCodeExample }) {
//   const codeExamples = {
//     // Load Data
//     loadCSV: `from pyspark.sql import SparkSession\n\n# قراءة بيانات CSV\nspark = SparkSession.builder.appName("Load CSV").getOrCreate()\ndf = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)\ndf.show()  # عرض البيانات\nprint("أول 5 صفوف: ", df.head(5))  # عرض أول 5 صفوف`,
//     loadSQL: `from pyspark.sql import SparkSession\n\n# قراءة بيانات من قاعدة بيانات SQL\nspark = SparkSession.builder.appName("Load SQL").getOrCreate()\ndf = spark.read.format("jdbc")\n.option("url", "jdbc:postgresql://hostname:port/dbname")\n.option("dbtable", "table_name")\n.option("user", "username")\n.option("password", "password")\n.load()\ndf.show()  # عرض البيانات\nprint("أول 5 صفوف: ", df.head(5))  # عرض أول 5 صفوف`,
//     loadOracle: `from pyspark.sql import SparkSession\n\n# قراءة بيانات من Oracle\nspark = SparkSession.builder.appName("Load Oracle").getOrCreate()\ndf = spark.read.format("jdbc")\n.option("url", "jdbc:oracle:thin:@//hostname:port/service_name")\n.option("dbtable", "table_name")\n.option("user", "username")\n.option("password", "password")\n.load()\ndf.show()  # عرض البيانات\nprint("أول 5 صفوف: ", df.head(5))  # عرض أول 5 صفوف`,
//     loadMongoDB: `from pyspark.sql import SparkSession\n\n# قراءة بيانات من MongoDB\nspark = SparkSession.builder.appName("Load MongoDB").getOrCreate()\ndf = spark.read.format("mongo")\n.option("uri", "mongodb://username:password@hostname:port/dbname.collection")\n.load()\ndf.show()  # عرض البيانات\nprint("أول 5 صفوف: ", df.head(5))  # عرض أول 5 صفوف`,
//   };

//   const explanations = {
//     loadCSV: "هذا الكود يوضح كيفية قراءة بيانات من ملف CSV إلى DataFrame، وعرض البيانات مع إظهار أول 5 صفوف.",
//     loadSQL: "هذا المثال يوضح كيفية قراءة البيانات من قاعدة بيانات SQL باستخدام JDBC وعرض أول 5 صفوف من البيانات.",
//     loadOracle: "هذا الكود يوضح كيفية قراءة البيانات من قاعدة بيانات Oracle باستخدام JDBC مع عرض أول 5 صفوف.",
//     loadMongoDB: "هذا المثال يوضح كيفية قراءة البيانات من MongoDB مع عرض أول 5 صفوف من البيانات.",
//   };

//   return (
//     <div style={{ width: '250px', backgroundColor: '#f1f1f1', padding: '20px' }}>
//       <h3>مواضيع Spark</h3>
//       <h4>تحميل البيانات</h4>
//       {Object.keys(codeExamples).map((key) => (
//         <button 
//           key={key}
//           onClick={() => setCodeExample({ code: codeExamples[key], explanation: explanations[key] })}
//           style={buttonStyle}
//         >
//           {key.replace(/([A-Z])/g, ' $1').trim()}  {/* Displays the key with spaces */}
//         </button>
//       ))}
//     </div>
//   );
// }

// const buttonStyle = {
//   width: '100%',
//   padding: '10px',
//   margin: '10px 0',
//   backgroundColor: '#333',
//   color: 'white',
//   border: 'none',
//   cursor: 'pointer',
// };

// export default Sidebar;
