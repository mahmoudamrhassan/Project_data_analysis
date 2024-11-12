import React from 'react';

function Sidebar({ setCodeExample }) {



const codeExamples = {
  // Hive Ql Journey
  readhive: `
# Import required libraries
from pyspark.sql import SparkSession
# Create Spark session
spark = SparkSession.builder.appName('DataProcessing').getOrCreate()
# Read data using SQL
df = spark.sql('SELECT * FROM dbname.table_name')
`,

  Fillnull: `
# Fill null values
df = df.na.fill('Missing Value', ['column_name'])
`,

  DropNull: `
# Drop rows with null values
df = df.na.drop(subset=['column_name'])
`,

  ChangeColumnType: `
from pyspark.sql.types import StringType, IntegerType
from pyspark.sql.functions import col

# Change column types
df = df.withColumn('column_name', col('column_name').cast(StringType()))
`,

  Addsequence: `
from pyspark.sql.window import Window
from pyspark.sql.functions import row_number

# Add sequence number
window = Window.orderBy('id')
df = df.withColumn('sequence', row_number().over(window))
`,

  Renamecolumn: `
# Rename columns
df = df.withColumnRenamed('column_name', 'new_column_name')
`,

  Writeastable: `
# Write processed data as a table
df.write.option('path', 'hdfs://PROD-HDFS-NN-HA/warehouse/tablespace/external/hive/Database_Name.db/new_table_name').saveAsTable('dbname.table_name')
`,

  join:   `
  Exable Tow Table 
# Perform a join between DataFrames

`,

  union: `
# Union two DataFrames
df1 = spark.sql("SELECT * FROM dbname.table1")
df2 = spark.sql("SELECT * FROM dbname.table2")

# Ensure both DataFrames have the same schema before union
union_df = df1.union(df2)
union_df.show()
`,

  povit: `
from pyspark.sql.functions import col

# Pivot the data
pivoted_df = df.groupBy('group_column').pivot('pivot_column').agg({'value_column': 'sum'})
pivoted_df.show()
`,

  OptimizingRead: `
df.write.partitionBy('partition_column').format('parquet').saveAsTable('dbname.optimized_table')
`,

  InteractingwithHDFS: `
df.write.option('path', 'hdfs://path/to/hive/table').saveAsTable('dbname.new_table')
`,

  readCSV: `
from pyspark.sql import SparkSession

# Read CSV data
spark = SparkSession.builder.appName("Read CSV").getOrCreate()
df = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)
df.show()
`,

  readSQL: `
from pyspark.sql import SparkSession

# Read data from SQL database
spark = SparkSession.builder.appName("Read SQL").getOrCreate()
df = spark.read.format("jdbc").option("url", "jdbc:postgresql://hostname:port/dbname").option("dbtable", "table_name").option("user", "username").option("password", "password").load()
df.show()
`,

  readOracle: `
from pyspark.sql import SparkSession

# Read data from Oracle
spark = SparkSession.builder.appName("Read Oracle").getOrCreate()
df = spark.read.format("jdbc").option("url", "jdbc:oracle:thin:@//hostname:port/service_name").option("dbtable", "table_name").option("user", "username").option("password", "password").load()
df.show()
`,

  readMongoDB: `
from pyspark.sql import SparkSession

# Read data from MongoDB
spark = SparkSession.builder.appName("Read MongoDB").getOrCreate()
df = spark.read.format("mongo").option("uri", "mongodb://username:password@hostname:port/dbname.collection").load()
df.show()
`,

  writeCSV: `
# Write data to CSV
df.write.csv("path/to/output.csv")
`,

  printschemaa: `
# Print DataFrame schema
df.printSchema()
`,

  basicStatistics: `
from pyspark.sql.functions import avg, max, min

# Basic statistics
df.select(avg("column_name"), max("column_name"), min("column_name")).show()
`,

  groupBy: `
# Group by column and count
df.groupBy("column_name").count().show()
`,

  correlation: `
# Calculate correlation between columns
correlation = df.stat.corr("column1", "column2")
print("Correlation: ", correlation)
`,

  nullValues: `
from pyspark.sql.functions import count, when, isnull

# Count null values in each column
df.select([count(when(isnull(c), c)).alias(c) for c in df.columns]).show()
`,

  dataPrep: `
from pyspark.ml.feature import StandardScaler
from pyspark.ml.linalg import Vectors

# Data preparation for ML
spark = SparkSession.builder.appName("MLlib Data Preparation").getOrCreate()
data = [(0, Vectors.dense([1.0, 0.1, -1.0]),), (1, Vectors.dense([2.0, 1.1, 1.0]),)]
df = spark.createDataFrame(data, ["id", "features"])
scaler = StandardScaler(inputCol="features", outputCol="scaledFeatures")
scalerModel = scaler.fit(df)
scaledData = scalerModel.transform(df)
scaledData.show()
`,

  replaceDollar: `
from pyspark.sql.functions import regexp_replace

# Replace dollar sign in a column
new_df = df.withColumn("new_column", regexp_replace("column_name", "\\$", ""))
new_df.show()
`,

  changeDataType: `
# Change data type of a column
new_df = df.withColumn("column_name", df["column_name"].cast("integer"))
new_df.printSchema()
`,

  changeDateFormat: `
from pyspark.sql.functions import date_format

# Change date format of a column
new_df = df.withColumn("formatted_date", date_format("date_column", "yyyy-MM-dd"))
new_df.show()
`,

  visualizationExample: `
import matplotlib.pyplot as plt
import pandas as pd

# Visualization using Matplotlib
pdf = df.toPandas()
plt.figure(figsize=(10,6))
plt.bar(pdf['column_name'], pdf['another_column'])
plt.title('Visualization Example')
plt.show()
`
};

const explanations = {
  readhive: "هذا الكود يوضح كيفية قراءة البيانات من جداول Hive باستخدام SQL في Spark.",
  Fillnull: "هذا المثال يوضح كيفية ملء القيم الفارغة في عمود معين باستخدام قيمة افتراضية.",
  DropNull: "هذا الكود يوضح كيفية حذف الصفوف التي تحتوي على قيم فارغة في عمود معين من DataFrame.",
  ChangeColumnType: "يوضح هذا المثال كيفية تغيير نوع بيانات عمود في DataFrame باستخدام الدالة cast.",
  Addsequence: "هذا الكود يوضح كيفية إضافة تسلسل أرقام إلى DataFrame باستخدام وظيفة نافذة.",
  Renamecolumn: "يوضح هذا الكود كيفية إعادة تسمية عمود في DataFrame.",
  Writeastable: "هذا الكود يوضح كيفية كتابة البيانات إلى جدول Hive باستخدام SQL في Spark.",
  join: "يوضح هذا الكود كيفية إجراء عملية دمج بين DataFrames باستخدام Spark SQL.",
  union: "يوضح هذا المثال كيفية دمج DataFrames باستخدام عملية union.",
  povit: "يوضح هذا الكود كيفية تدوير البيانات وتجميعها حسب القيم.",
  OptimizingRead: "يوضح هذا الكود كيفية تقسيم البيانات لتحسين الأداء.",
  InteractingwithHDFS: "يوضح هذا الكود كيفية الكتابة إلى مسار HDFS.",
  readCSV: "يوضح هذا الكود كيفية قراءة البيانات من ملف CSV.",
  readSQL: "يوضح كيفية قراءة البيانات من قاعدة بيانات SQL باستخدام JDBC.",
  readOracle: "يوضح كيفية قراءة البيانات من قاعدة بيانات Oracle.",
  readMongoDB: "يوضح كيفية قراءة البيانات من MongoDB.",
  writeCSV: "يوضح كيفية كتابة البيانات إلى ملف CSV.",
  printschemaa: "يوضح كيفية طباعة مخطط بيانات DataFrame.",
  basicStatistics: "يوضح كيفية حساب الإحصائيات الأساسية لعمود معين.",
  groupBy: "يوضح كيفية تجميع البيانات حسب عمود معين.",
  correlation: "يوضح كيفية حساب الارتباط بين عمودين.",
  nullValues: "يوضح كيفية حساب القيم الفارغة في الأعمدة.",
  dataPrep: "يوضح كيفية إعداد البيانات باستخدام مكتبة MLlib.",
  replaceDollar: "يوضح كيفية استبدال علامة الدولار في عمود.",
  changeDataType: "يوضح كيفية تغيير نوع البيانات لعمود.",
  changeDateFormat: "يوضح كيفية تغيير تنسيق التاريخ في عمود.",
  visualizationExample: "يوضح كيفية استخدام Matplotlib لتصور البيانات بعد تحويلها إلى Pandas."
};

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
