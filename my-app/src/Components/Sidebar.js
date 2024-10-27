import React from 'react';

function Sidebar({ setCodeExample }) {
  const codeExamples = {
    // Spark Basics
    architecture: `from pyspark.sql import SparkSession\n\n# Create a Spark session\nspark = SparkSession.builder.appName("SparkArchitecture").getOrCreate()\nprint(spark)`,
    rddBasics: `from pyspark import SparkContext\n\n# Initialize a SparkContext\nsc = SparkContext("local", "RDD Example")\ndata = [1, 2, 3, 4, 5]\nrdd = sc.parallelize(data)\nprint(rdd.collect())`,
    dataFrames: `from pyspark.sql import SparkSession\n\n# Create a Spark session\nspark = SparkSession.builder.appName("DataFrame Example").getOrCreate()\ndata = [('Alice', 1), ('Bob', 2)]\ndf = spark.createDataFrame(data, ['name', 'id'])\ndf.show()`,
    
    // Data Ingestion
    readCSV: `from pyspark.sql import SparkSession\n\n# Reading CSV data\nspark = SparkSession.builder.appName("Read CSV").getOrCreate()\ndf = spark.read.csv("path/to/file.csv", header=True, inferSchema=True)\ndf.show()`,
    writeCSV: `# Writing Data to CSV\ndf.write.csv("path/to/output.csv")`,
    
    // Machine Learning with MLlib
    dataPrep: `from pyspark.ml.feature import StandardScaler\nfrom pyspark.ml.linalg import Vectors\n\n# Sample data for scaling\nspark = SparkSession.builder.appName("MLlib Data Preparation").getOrCreate()\ndata = [(0, Vectors.dense([1.0, 0.1, -1.0]),), (1, Vectors.dense([2.0, 1.1, 1.0]),)]\ndf = spark.createDataFrame(data, ["id", "features"])\nscaler = StandardScaler(inputCol="features", outputCol="scaledFeatures")\nscalerModel = scaler.fit(df)\nscaledData = scalerModel.transform(df)\nscaledData.show()`,
    modelTraining: `from pyspark.ml.classification import LogisticRegression\nfrom pyspark.ml.linalg import Vectors\n\n# Training a logistic regression model\nspark = SparkSession.builder.appName("Model Training").getOrCreate()\ndata = [(0.0, Vectors.dense([1.0, 0.1, -1.0])), (1.0, Vectors.dense([2.0, 1.1, 1.0]))]\ndf = spark.createDataFrame(data, ["label", "features"])\nlr = LogisticRegression(maxIter=10)\nmodel = lr.fit(df)\nprint("Coefficients: ", model.coefficients)`,
    modelEvaluation: `from pyspark.ml.evaluation import MulticlassClassificationEvaluator\n\n# Evaluating model accuracy\npredictions = model.transform(df)\nevaluator = MulticlassClassificationEvaluator(labelCol="label", predictionCol="prediction", metricName="accuracy")\naccuracy = evaluator.evaluate(predictions)\nprint("Test Accuracy = ", accuracy)`,
    
    // Graph Processing
    graphX: `from pyspark.sql import SparkSession\nfrom graphframes import GraphFrame\n\n# Create a GraphFrame\nvertices = spark.createDataFrame([("1", "Alice"), ("2", "Bob")], ["id", "name"])\nedges = spark.createDataFrame([("1", "2", "friend")], ["src", "dst", "relationship"])\ng = GraphFrame(vertices, edges)\ng.vertices.show()`,
    
    // Streaming Data
    structuredStreaming: `from pyspark.sql import SparkSession\n\n# Streaming example\nlines = spark.readStream.format("socket").option("host", "localhost").option("port", 9999).load()\nwords = lines.selectExpr("split(value, ' ') as words")\nquery = words.writeStream.outputMode("append").format("console").start()\nquery.awaitTermination()`,
    
    // Performance Tuning
    optimization: `from pyspark.sql import SparkSession\n\n# Caching DataFrame and broadcasting variable\nspark = SparkSession.builder.appName("Optimization").getOrCreate()\ndf = spark.read.csv("path/to/file.csv")\ncachedDF = df.cache()\nbroadcastVar = spark.sparkContext.broadcast([1, 2, 3])\nprint(broadcastVar.value)`,
    clusterConfig: `from pyspark.sql import SparkSession\n\n# Spark configuration example\nspark = SparkSession.builder.appName("Cluster Config").config("spark.executor.memory", "4g").getOrCreate()\nprint(spark.sparkContext.getConf().getAll())`,
    
    // Integration with Other Tools
    ecosystemIntegration: `from pyspark.sql import SparkSession\n\n# Integration with Hadoop\nspark = SparkSession.builder.appName("Integration").config("spark.hadoop.fs.defaultFS", "hdfs://namenode:9000").getOrCreate()\ndf = spark.read.format("parquet").load("hdfs://namenode:9000/path/to/file")\ndf.show()`,
    
    // Best Practices
    dataGovernance: `from pyspark.sql.functions import current_date\n\n# Adding data lineage with ingestion date\ndata = spark.read.csv("path/to/data.csv")\ndata = data.withColumn("ingestion_date", current_date())\ndata.show()`,
    versionControl: `from pyspark.sql import SparkSession\n\n# Saving data with version control\nspark = SparkSession.builder.appName("Version Control").getOrCreate()\ndata.write.format("parquet").mode("overwrite").option("path", "path/to/output").option("version", "v1").save()`
  };

  const explanations = {
    architecture: "This example initializes a Spark session, which is the entry point for using Spark functionality. It manages the Spark application's lifecycle and connects to the cluster resources.",
    rddBasics: "This code demonstrates how to create an RDD (Resilient Distributed Dataset), the basic data structure in Spark, from a list of numbers and perform a basic operation.",
    dataFrames: "A DataFrame is a distributed collection of data organized into named columns, similar to a database table. This example shows how to create a DataFrame and display its content.",
    
    readCSV: "This code shows how to read data from a CSV file into a Spark DataFrame, with header inference and schema inference enabled.",
    writeCSV: "This snippet demonstrates how to write data from a DataFrame to a CSV file.",
    
    dataPrep: "This code demonstrates data preparation techniques in Spark's MLlib, including feature scaling. Feature scaling is essential for machine learning algorithms to converge faster.",
    modelTraining: "This example shows how to train a logistic regression model using MLlib's API. The model is trained on sample data to predict labels based on features.",
    modelEvaluation: "This snippet evaluates the performance of a classification model using accuracy as the metric, providing insight into the model's effectiveness.",
    
    graphX: "This code demonstrates the basics of GraphX in Spark, used for graph-parallel processing. A GraphFrame is created with vertices and edges representing a social network.",
    
    structuredStreaming: "This example shows how to use Spark Structured Streaming to read data from a socket source and process it in real time, outputting to the console.",
    
    optimization: "Caching data and using broadcast variables can optimize Spark performance. Caching stores DataFrames in memory, while broadcasting reduces data transfer costs.",
    clusterConfig: "This code shows how to configure Spark settings, such as memory allocation, to improve cluster resource utilization.",
    
    ecosystemIntegration: "Spark can integrate with Hadoop and other systems. This example configures Spark to read data from HDFS, Hadoop’s distributed storage system.",
    
    dataGovernance: "This example adds data lineage information (e.g., ingestion date) to the data, which is essential for tracking data's origin and transformation history.",
    versionControl: "This snippet demonstrates a method for saving DataFrames with versioning, enabling organized storage of dataset versions in Spark applications."
  };

  return (
    <div style={{ width: '200px', backgroundColor: '#f1f1f1', padding: '20px' }}>
      <h3>Spark Topics</h3>
      {Object.keys(codeExamples).map((key) => (
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
